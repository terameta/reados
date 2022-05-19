import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { User } from '@typedefs/user';
import { getDB } from '../utilities/database/generate-connection';
import { verify } from 'jsonwebtoken';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

	const db = await getDB();

	try {
		const user = verify( req.headers.authorization?.replace( 'Bearer ', '' ) || '', process.env.JWT_SECRET! ) as User;

		if ( user.type === 'admin' ) {

			const query = 'SELECT * FROM public.user WHERE type = $1';
			const { rows: users, rowCount } = await db.query( query, [ 'admin' ] );

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
	} finally {
		await db.end();
	}

};

export default httpTrigger;