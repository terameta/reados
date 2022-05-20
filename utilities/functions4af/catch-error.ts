import { Context } from '@azure/functions';

export const catchAF = async ( context: Context, error: any ) => {
	context.log( error );
	context.res = {
		status: 500,
		body: { message: error.message || 'Server error, please try again' }
	}
}