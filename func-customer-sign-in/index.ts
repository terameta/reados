import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getDB } from '../utilities/database/generate-connection';
import { validateCredentials } from '../utilities/validation/credential-validation';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

    const { email, password } = req.body;

    let user: any;

    const validationResult = await validateCredentials( { email, password } );

    if ( validationResult.isValid ) {

        const db = await getDB();

        const uQuery = 'SELECT * FROM public.user WHERE email = $1';
        // file deepcode ignore HTTPSourceWithUncheckedType: We are checking the type of the email variable at validateCredentials function already.
        const { rows: uRows, rowCount } = await db.query( uQuery, [ email.toLowerCase() ] );

        if ( rowCount === 0 ) {
            validationResult.isValid = false; validationResult.errors.push( 'Email is not registered.' );
        } else {
            user = uRows[ 0 ];
            if ( !( await verify( user.password, password ) ) ) {
                validationResult.isValid = false; validationResult.errors.push( 'Password is incorrect.' );
            }
        }
    }

    let token: string = '';
    if ( validationResult.isValid && process.env.JWT_SECRET ) {
        token = sign( { id: user.id, email, type: user.type, isPrimaryAdmin: user.isPrimaryAdmin }, process.env.JWT_SECRET, { expiresIn: '365d' } );
    }

    context.res = validationResult.isValid
        ? { status: 200, body: { token } }
        : { status: 400, body: { message: 'Invalid credentials, please try again' } };

};

export default httpTrigger;