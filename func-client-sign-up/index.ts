import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { sign } from 'jsonwebtoken';
import { getDB } from '../utilities/database/generate-connection';
import { validateCredentials } from '../utilities/validation/credential-validation';

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<void> => {
	const { email, password } = req.body;
	const validationResult = await validateCredentials({ email, password });

	let userId = '';

	if (validationResult.isValid) {
		const db = await getDB();

		const { rowCount } = await db.query(
			'SELECT * FROM public.user WHERE email = $1',
			[email.toLowerCase()]
		);
		if (rowCount > 0) {
			validationResult.isValid = false;
			validationResult.errors.push('Email is already in use.');
		}

		if (validationResult.isValid) {
			try {
				await db.query('BEGIN');

				const cResult = await db.query(
					'INSERT INTO public."client" ("name") VALUES ($1) RETURNING id',
					['']
				);
				const clientId = cResult.rows[0].id;

				const uResult = await db.query(
					'INSERT INTO public."user" ("email", "password", "client") VALUES ($1, $2, $3) RETURNING id',
					[email.toLowerCase(), password, clientId]
				);

				await db.query('COMMIT');

				const userId = uResult.rows[0].id;
			} catch (error) {
				await db.query('ROLLBACK');
				throw error;
			} finally {
				await db.end();
			}
		}

		await db.end();
	}

	let token: string = '';
	if (validationResult.isValid && process.env.JWT_SECRET) {
		token = sign({ id: userId, email }, process.env.JWT_SECRET, {
			expiresIn: '365d',
		});
	}

	context.res = validationResult.isValid
		? { status: 200, body: { token } }
		: { status: 400, body: validationResult.errors };
};

export default httpTrigger;
