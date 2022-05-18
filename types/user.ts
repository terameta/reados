export type User = {
	id: string,
	email: string,
	displayName: string,
	firstName: string,
	middleName: string,
	lastName: string,
	type: 'customer' | 'admin',
	isPrimaryAdmin?: boolean,
	createdAt?: string,
}