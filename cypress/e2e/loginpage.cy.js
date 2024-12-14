/* eslint no-undef: 0 */

describe('Login Page', () => {
  it('should display the login form', () => {
    cy.visit('/users/login');
    cy.get('[data-testid="login-form"]').should('exist');
  });

  describe('login form', () => {
    beforeEach(() => {
      cy.visit('users/login');
    });
    it('should display the username input', () => {
      cy.get('input[name="username"]').should('exist');
    });
    it('should display the password input', () => {
      cy.get('input[name="password"]').should('exist');
    });
    it('should display the submit button', () => {
      cy.get('button[type="submit"]').should('exist');
    });
    it('should display the forgot password link', () => {
      cy.get('a[href="/users/forgot-password"]').should('exist');
    });
    it('should display the signup link', () => {
      cy.get('a[href="/users/signup"]').should('exist');
    });
    it('should display loading spinner when form is submitted', () => {
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="login-loginform-loader"]').should('exist');
    });
  });

  describe('forgot password link', () => {
    beforeEach(() => {
      cy.visit('/users/login');
    });
    it('should display the forgot password link', () => {
      cy.get('a[href="/users/forgot-password"]').click();
      cy.url().should('include', '/users/forgot-password');
    });
    it('on click should navigate to forgot password page', () => {
      cy.get('a[href="/users/forgot-password"]').click();
      cy.url().should('include', '/users/forgot-password');
    });
  });

  describe('signup link', () => {
    beforeEach(() => {
      cy.visit('/users/login');
    });
    it('should display the signup link', () => {
      cy.get('a[href="/users/signup"]').click();
      cy.url().should('include', '/users/signup');
    });
    it('on click should navigate to signup page', () => {
      cy.get('a[href="/users/signup"]').click();
      cy.url().should('include', '/users/signup');
    });
  });
});
