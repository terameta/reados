import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

export type ValidationResult = {
	isValid: boolean;
	errors: string[];
};

export const validateCredentials = async (payload: {
	email: string;
	password: string;
}) => {
	const toReturn: ValidationResult = {
		isValid: true,
		errors: [],
	};

	if (typeof payload.email !== 'string') {
		toReturn.isValid = false;
		toReturn.errors.push('Email must be a string.');
		return toReturn;
	}

	if (typeof payload.password !== 'string') {
		toReturn.isValid = false;
		toReturn.errors.push('Password must be a string.');
	}

	if (
		!isStrongPassword(payload.password, {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1,
		})
	) {
		toReturn.isValid = false;
		toReturn.errors.push(
			'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.'
		);
	}

	if (!isEmail(payload.email)) {
		toReturn.isValid = false;
		toReturn.errors.push('Email must be a valid email address.');
	}

	return toReturn;
};
