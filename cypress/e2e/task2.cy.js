describe('Adding cheapest phone to the cart test', () => {

    // User credentials for the login 
    let credentials;
    
    before ('Loading user credentials', () => {
        cy.fixture('credentials.json').then((cred) => {
            credentials = cred;
        });

        cy.visit("https://www.demoblaze.com/index.html");
    });

    it("Login and adding cheapest phone to cart", () => {

        // Login process
        cy.get('#login2').click();
        cy.get('#loginusername').invoke('val', credentials.user);
        cy.get('#loginpassword').invoke('val', credentials.password);
        cy.get("button[onclick='logIn()']").click();

        // Making sure we've successfully logged in
        let welcomeMessage = "Welcome " + credentials.user;
        cy.get('#nameofuser').should("have.text", welcomeMessage);
        
        // Navigating to the phones section
        cy.get("#itemc").first().click();
        cy.wait(1000);
        
        // Dynamically extracting the cheapest phone 
        let cheapestPrice = Infinity;
        let cheapestPhoneName = '';
        
        cy.get('.card-block').each(($phone) => {
            const phoneName = $phone.find('.card-title').text();
            const phonePrice = parseFloat(
              $phone.find('h5').text().replace('$', '')
            );
            
            if (phonePrice < cheapestPrice) {
              cheapestPrice = phonePrice;
              cheapestPhoneName = phoneName;
            }

        }).then(() => {
            // Adding cheapest phone to the cart and validate the process successed
            cy.contains(cheapestPhoneName).click();
            cy.contains('Add to cart').click();
            cy.on('window:alert', (text) => {
                expect(text).to.contain('Product added');
            })
        })

    })

});
  