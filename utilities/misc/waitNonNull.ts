import { BehaviorSubject } from 'rxjs';
import { waiter } from './waiter';

export const getNonNullValue = async<T = any> ( payload: BehaviorSubject<any>, duration = 300 ): Promise<T> => {
	const possibleReturn = payload.getValue();
	if ( possibleReturn ) {
		return possibleReturn;
	} else {
		await waiter( duration );
		return await getNonNullValue( payload, duration * 2 );
	}
};

export const getNonNullNonEmptyValue = async <T = any> ( payload: BehaviorSubject<T>, duration = 300 ): Promise<T> => {
	const possibleReturn = payload.getValue();
	let isNonEmpty = false;
	if ( possibleReturn && Array.isArray( possibleReturn ) && possibleReturn.length > 0 ) isNonEmpty = true;
	if ( possibleReturn && !Array.isArray( possibleReturn ) && Object.values( possibleReturn ).length > 0 ) isNonEmpty = true;
	if ( isNonEmpty ) {
		return possibleReturn;
	} else {
		await waiter( duration );
		return await getNonNullNonEmptyValue( payload, duration * 2 );
	}
};
