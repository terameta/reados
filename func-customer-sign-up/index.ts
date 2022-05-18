import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sign } from "jsonwebtoken";
import { getDB } from "../utilities/database/generate-connection";
import { validateCredentials } from '../utilities/validation/credential-validation';
import { hash, argon2id } from 'argon2';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

    const { email, password } = req.body;
    const validationResult = await validateCredentials( { email, password } );

    let userId = '';

    if ( validationResult.isValid ) {

        const db = await getDB();

        const cQuery = 'SELECT * FROM public.user WHERE email = $1';
        // file deepcode ignore HTTPSourceWithUncheckedType: We are checking the type of the email variable at validateCredentials function already.
        const { rowCount } = await db.query( cQuery, [ email.toLowerCase() ] );
        if ( rowCount > 0 ) { validationResult.isValid = false; validationResult.errors.push( 'Email is already in use.' ); }

        if ( validationResult.isValid ) {

            const uQuery = 'INSERT INTO public.user ("email", "password") VALUES ($1, $2) RETURNING id';
            const hPassword = await hash( password, { type: argon2id, memoryCost: 2 ** 16 } );
            const uResult = await db.query( uQuery, [ email.toLowerCase(), hPassword ] );
            userId = uResult.rows[ 0 ].id;

        }

        await db.end();
    }

    let token: string = '';
    if ( validationResult.isValid && process.env.JWT_SECRET ) {
        token = sign( { id: userId, email }, process.env.JWT_SECRET, { expiresIn: '365d' } );
    }

    context.res = validationResult.isValid
        ? { status: 200, body: { token } }
        : { status: 400, body: { message: validationResult.errors.join( '\n' ) } };

};

export default httpTrigger;