import { Context } from '@azure/functions';

export const respondAF = async ( context: Context, result: any = { result: 'OK' } ) => {
	context.res = {
		status: 200,
		body: result,
	}
}