export const waiter = ( howLong: number = 1000 ) => {
	return new Promise<void>( ( resolve ) => {
		setTimeout( () => {
			resolve();
		}, howLong );
	} );
}