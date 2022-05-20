import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { catchAF } from '../utilities/functions4af/catch-error';
import { getDB } from '../utilities/database/connect';
import { verifyAuth } from '../utilities/functions4af/verify-auth';
import { Client } from 'pg';
import { userToDB } from '../typedefs/user';
import { respondAF } from '../utilities/functions4af/send-response';

const httpTrigger: AzureFunction = async function ( context: Context, req: HttpRequest ): Promise<void> {

	let db: Client | null = null;


	try {
		const requester = await verifyAuth( req );
		if ( requester.type !== 'admin' ) throw new Error( 'Not allowed for customers' );
		db = await getDB();
		const query = 'UPDATE public."user" SET email = $1, details = $2 WHERE id = $3'
		const payload = userToDB( req.body );
		await db.query( query, [ payload.email, payload.details, payload.id ] );
		await respondAF( context );

	} catch ( error: any ) {
		await catchAF( context, error );
	} finally {
		if ( db ) db.end();
	}

};

export default httpTrigger;