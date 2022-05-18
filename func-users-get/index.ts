import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { User } from '@typedefs/user';
import { getDB } from '../utilities/database/generate-connection';
import { verify } from 'jsonwebtoken';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

    try {
        const user = verify( req.headers.authorization?.replace( 'Bearer ', '' ) || '', process.env.JWT_SECRET! ) as User;

        if ( user.type === 'admin' ) {
            const db = await getDB();

            const query = 'SELECT * FROM public.user';
            const { rows: users, rowCount } = await db.query( query );

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: users.map( u => { delete u.password; return u; } )
            };
        } else {
            context.res = {
                status: 401,
                body: { message: 'You are not authorized to do this.' }
            };
        }

    } catch ( error: any ) {
        context.res = {
            status: 500,
            body: { message: 'Server error, please try again.' }
        };
    }

};

export default httpTrigger;