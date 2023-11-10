const randomEmail = () => `${Math.random().toString(36).substring(2, 15)}@gmail.com`;
const randomStr = () => `${Math.random().toString(36).substring(2, 15)}`;
const ADMIN_EMAIL = randomEmail();
// This email just need to have a place to be booked by ADMIN
const HOST_EMAIL = randomEmail();
const ACC = {
  ADMIN: ADMIN_EMAIL,
  HOST: HOST_EMAIL,
};
const PWD = '123456';
const performLogin = (role: string) => {
  cy.get('header').find('button[aria-label="menu trigger"]').click();
  cy.get('a[href="/login"]').click();
  cy.get('input[id="email"]').type(ACC[role]);
  cy.get('input[id="password"]').type(PWD);
  cy.get('button[type="submit"]').click();
};
const performRegister = (role: string) => {
  cy.get('header').find('button[aria-label="menu trigger"]').click();
  cy.get('a[href="/register"]').click();
  cy.get('input[id="email"]').type(ACC[role]);
  cy.get('input[id="name"]').type(role);
  cy.get('input[id="password"]').type(PWD);
  cy.get('input[id="confirmPassword"]').type(PWD);
  cy.get('button[type="submit"]').click();
};
describe('user happy path', () => {
  it('Should navigate to the home page', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000/');
  });
  it.only('Registers successfully for ADMIN', () => {
    cy.visit('localhost:3000/');
    performRegister('ADMIN');
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Sign up successfully!');
    cy.url().should('include', 'localhost:3000/');
  });
  it.only('Registers successfully for HOST', () => {
    cy.visit('localhost:3000/');
    performRegister('HOST');
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Sign up successfully!');
    cy.url().should('include', 'localhost:3000/');
  });
  it.only('Create a new listing successfully', () => {
    cy.visit('localhost:3000/');
    performLogin('HOST');
    // create a new listing
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.get('a[href="/listing/hosted"]').click();
    cy.get('a[href="/listing/create"]').click();
    cy.get('input[id="title"]').type(randomStr());
    cy.get('input[id="address"]').type(randomStr());
    // add 2 bathrooms
    cy.get('button').find('+').click().click();
    cy.get('input[id="bedrooms_0_type"]').click();

    cy.get('.ant-select-item-option-content').contains('Master').click();
    cy.get('input[id="bedrooms_0_num"]').clear().type('2');

    cy.get('#amenities').focus().type('Pool').type('{enter}');

    // upload
    cy.get('input[type="file"]').selectFile('./test.jpg', {
      force: true,
    });
    cy.wait(1000);
    // cy.get('input[type="file"]').selectFile('./test.jpg', {
    //   force: true,
    // });
    // cy.wait(1000);
    cy.get('input[id="price"]').type('100');
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    // assert
    cy.url().should('include', 'localhost:3000/listing/hosted');
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Listing created successfully!');
  });
  it.only('Updates the thumbnail and title of the listing successfully', () => {
    // login
    cy.visit('localhost:3000/');
    performLogin('HOST');

    // go to the hosted listing page
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.get('a[href="/listing/hosted"]').click();
    cy.wait(2000);
    cy.get('[role="link"]').contains('Edit').click();
    // update the title
    cy.get('input[id="title"]').clear().type(randomStr());

    // update the image/thumbnail
    cy.get('button[title="Remove file"]').first().click();
    // cy.get('button[title="Remove file"]').first().click();
    cy.get('input[type="file"]').selectFile('./test2.webp', {
      force: true,
    });
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // assert
    cy.url().should('include', 'localhost:3000/listing/hosted');
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Listing updated successfully!');
  });
  it.only('Publish a listing successfully', () => {
    cy.visit('localhost:3000/');
    // login
    performLogin('HOST');

    // go to the hosted listing page
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.get('a[href="/listing/hosted"]').click();
    cy.wait(2000);
    // click the publish button
    cy.get('[role="button"]').contains('Publish').click();

    // select the date
    cy.get('input[placeholder="Start"]').click();
    cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').first().click();
    cy.get('input[placeholder="End"]').click();
    cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').last().click();
    // click the publish button
    cy.get('button').contains('Publish').click();
    cy.wait(2000);
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Listing published');
  });
  it.only('Make a booking successfully', () => {
    cy.visit('localhost:3000/');
    // login
    performLogin('ADMIN');
    cy.wait(2000);
    // go to a certain listing page
    cy.get('.ant-card-cover').first().click();
    cy.get('.ant-btn-primary').contains('Book').click();
    // select the date
    cy.get('input[placeholder="Start"]').click();
    cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').first().click();
    cy.get('input[placeholder="End"]').click();
    cy.get('.ant-picker-cell').not('.ant-picker-cell-disabled').last().click();
    // click the ok button to confirm the booking
    cy.get('button').contains('OK').click();
    cy.wait(2000);
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Booking created successfully!');
  });
  it.only('Unpublish a listing successfully', () => {
    cy.visit('localhost:3000/');
    // login
    performLogin('HOST');
    // go to the hosted listing page
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.get('a[href="/listing/hosted"]').click();
    cy.wait(2000);
    // click the publish button
    cy.get('[role="button"]').contains('View Available').click();
    cy.get('button').contains('Unpublish').click();
    cy.wait(2000);
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Listing unpublished');
  });
  it.only('Logs out of the application successfully', () => {
    // login
    cy.visit('localhost:3000/');
    performLogin('ADMIN');
    cy.wait(2000);
    // logout
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.contains('Log out').click();
    cy.wait(2000);
    // assert
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Log out successfully!');
    cy.url().should('include', 'localhost:3000/');
  });
  it.only('Logs back into the application successfully', () => {
    // login
    cy.visit('localhost:3000/');
    performLogin('ADMIN');
    cy.wait(2000);
    // logout
    cy.get('header').find('button[aria-label="menu trigger"]').click();
    cy.contains('Log out').click();
    cy.wait(2000);
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Log out successfully!');
    cy.url().should('include', 'localhost:3000/');

    // log back in
    performLogin('ADMIN');
    cy.get('div[class="ant-message-notice-content"]').should('contain', 'Log in successfully!');
    cy.url().should('include', 'localhost:3000/');
  });
});
