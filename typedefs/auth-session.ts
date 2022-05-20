import { User } from './user';

export type AuthSession = {
	user: User,
	token: string,
}