import { PhoneNumber } from './phone-number'

export type User = {
	id: string,
	email: string,
	displayName: string,
	firstName: string,
	middleName: string,
	lastName: string,
	phones: PhoneNumber[],
	emails: string[],
	addresses: string[],
	type: 'customer' | 'admin',
	isPrimaryAdmin?: boolean,
	createdAt?: string,
}

export type UserOnDB = {
	id: string,
	email: string,
	details: {
		firstName: string,
		middleName: string,
		lastName: string,
		phones: PhoneNumber[],
		emails: string[],
		addresses: string[],
	}
}

export const userFromDB = ( payload: UserOnDB ): User => {
	const toReturn: any = { ...payload, ...payload.details };
	delete toReturn.details;
	toReturn.displayName = toReturn.firstName || '';
	toReturn.displayName += toReturn.middleName ? ' ' + toReturn.middleName : '';
	toReturn.displayName += ' ' + ( toReturn.lastName || '' );
	toReturn.displayName = toReturn.displayName.trim();
	return toReturn;
}

export const userToDB = ( payload: User ): UserOnDB => {
	const toReturn: any = {};
	toReturn.id = payload.id;
	toReturn.email = payload.email;
	toReturn.details = payload;
	delete toReturn.detail.id;
	delete toReturn.detail.email;
	return toReturn;
}