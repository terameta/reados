import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Client } from 'pg';

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	const client = new Client({
		user: process.env.dbuser,
		host: process.env.dbhost,
		database: 'reados',
		password: process.env.dbpass,
		port: parseInt(process.env.dbport, 10),
		ssl: process.env.dbsslm === 'require' ? true : false,
	});
	await client.connect();
	const res = await client.query('SELECT * FROM test');
	await client.end();
	context.log('HTTP trigger function processed a request.');
	const name = req.query.name || (req.body && req.body.name);
	// const responseMessage = name
	// 	? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
	// 	: 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

	context.res = {
		// status: 200, /* Defaults to 200 */
		body: {
			result: 'prdafterrecreate',
			rows: res.rows,
		},
	};
};

export default httpTrigger;
