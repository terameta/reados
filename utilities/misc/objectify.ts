export const objectify = <T> ( obj: T ): T => {
	return <T>JSON.parse( JSON.stringify( obj ) );
}