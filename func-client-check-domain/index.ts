import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getDB } from '../utilities/database/generate-connection';

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<void> => {
	const { domain } = req.body;

	const db = await getDB();

	const { rowCount } = await db.query(
		'SELECT * FROM public."client" WHERE "mainDomain" = $1',
		[domain]
	);

	context.res = {
		status: 200,
		body: {
			result: rowCount === 0 ? 'available' : 'taken',
			message: rowCount === 0 ? 'Domain is available' : 'Domain is taken',
		},
	};
};

export default httpTrigger;
