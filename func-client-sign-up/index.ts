import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { sign } from 'jsonwebtoken';
import { getClient } from '../utilities/database/generate-client';

const httpTrigger: AzureFunction = async (
	context: Context,
	req: HttpRequest
): Promise<void> => {
	const { email, password } = req.body;
	let isValid = true;
	const validationErrors: string[] = [];
	if (
		!isStrongPassword(password, {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
	) {
		isValid = false;
		validationErrors.push(
			'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.'
		);
	}

	if (!isEmail(email)) {
		isValid = false;
		validationErrors.push('Email must be a valid email address.');
	}

	if (isValid) {
		const client = await getClient();
		const { rowCount } = await client.query(
			'SELECT * FROM public.user WHERE email = $1',
			[email.toLowerCase()]
		);
		await client.end();
		if (rowCount > 0) {
			isValid = false;
			validationErrors.push('Email is already in use.');
		}
	}

	let token: string = '';
	if (isValid && process.env.JWT_SECRET) {
		token = sign({ email, password }, process.env.JWT_SECRET, {
			expiresIn: '365d',
		});
	}

	context.res = isValid
		? { status: 200, body: { token } }
		: { status: 400, body: validationErrors };
};

export default httpTrigger;
