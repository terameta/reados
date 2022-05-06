import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

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

	context.res = isValid
		? { status: 200 }
		: { status: 400, body: validationErrors };

	// context.res = {
	// 	status: isValid ? 200 : 400,
	// 	body: isValid ? null : validationErrors,
	// };
};

export default httpTrigger;
