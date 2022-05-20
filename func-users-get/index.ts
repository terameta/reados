import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getDB } from '../utilities/database/connect';
import { verifyAuth } from '../utilities/functions4af/verify-auth';
import { Client } from 'pg';
import { userFromDB } from '../typedefs/user';
import { respondAF } from '../utilities/functions4af/send-response';
import { catchAF } from '../utilities/functions4af/catch-error';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

	let db: Client | null = null;

	try {
		const user = await verifyAuth( req );

		if ( user.type !== 'admin' ) throw new Error( 'Not allowed for customers' );

		db = await getDB();


		const query = 'SELECT * FROM public.user WHERE type = $1';
		const { rows: users } = await db.query( query, [ 'admin' ] );

		await respondAF( context, users.map( u => userFromDB( u ) ) );

	} catch ( error: any ) {
		catchAF( context, error );
	} finally {
		if ( db ) db.end();
	}

};

export default httpTrigger;