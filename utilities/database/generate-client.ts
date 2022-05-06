import { Client } from 'pg';

export const getClient = async () => {
	const client = new Client({
		user: process.env.dbuser,
		host: process.env.dbhost,
		database: 'reados',
		password: process.env.dbpass,
		port: parseInt(process.env.dbport || '5432', 10),
		ssl: process.env.dbsslm === 'require' ? true : false,
	});
	await client.connect();
	return client;
};
