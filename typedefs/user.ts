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
	password?: string,
	details: {
		firstName: string,
		middleName: string,
		lastName: string,
		phones: PhoneNumber[],
		emails: string[],
		addresses: string[],
	}
}

export const userFromDB = ( payload: UserOnDB, removePassword = true ): User => {
	if ( removePassword ) delete payload.password;
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
	toReturn.isPrimaryAdmin = payload.isPrimaryAdmin;
	toReturn.createdAt = payload.createdAt;
	toReturn.type = payload.type;
	toReturn.details = payload;
	delete toReturn.details.id;
	delete toReturn.details.email;
	delete toReturn.details.isPrimaryAdmin;
	delete toReturn.details.createdAt;
	delete toReturn.details.type;
	return toReturn;
}