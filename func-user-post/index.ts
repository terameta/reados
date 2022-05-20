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
		const query = 'INSERT INTO public."user" (email, type, details) VALUES ($1, $2, $3) RETURNING id'
		delete req.body.id;
		const payload = userToDB( req.body );
		const { rows } = await db.query( query, [ payload.email, 'admin', payload.details ] );
		await respondAF( context, rows[ 0 ] );

	} catch ( error: any ) {
		await catchAF( context, error );
	} finally {
		if ( db ) db.end();
	}

};

export default httpTrigger;