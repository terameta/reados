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
		const { id } = context.bindingData;
		const query = 'DELETE FROM public."user" WHERE id = $1'
		const { rows } = await db.query( query, [ id ] );
		await respondAF( context );

	} catch ( error: any ) {
		await catchAF( context, error );
	} finally {
		if ( db ) db.end();
	}

};

export default httpTrigger;