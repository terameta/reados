import { HttpRequest } from '@azure/functions';
import { User } from '../../typedefs/user';
import { verify } from 'jsonwebtoken';

export const verifyAuth = async ( req: HttpRequest ) => {
	return verify( req.headers.authorization?.replace( 'Bearer ', '' ) || '', process.env.JWT_SECRET! ) as User
}