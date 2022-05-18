/// <reference types="cypress" />

describe( 'End to End', () => {

	beforeEach( () => {
		cy.visit( '/' );
	} );

	it( 'Homepage navbar shows sign-in button before authentication', () => {
		cy.get( '[routerLink="sign-in"]' ).should( 'be.visible' );
		cy.get( '[routerLink="sign-up"]' ).should( 'be.visible' );
	} );

} );