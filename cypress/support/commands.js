

Cypress.Commands.add('createUser', user => {

    const payload =
    {
        userName: user.name,
        password: user.password
    }

    cy.api({
        method: 'POST',
        url: `/Account/v1/User`,
        body: payload,
    }).then(response => {
        expect(response.status).to.eq(201)
        Cypress.env('userId', response.body.userID)
    })

})


Cypress.Commands.add('deleteUser', () => {

    cy.api({
        method: 'DELETE',
        url: `/Account/v1/user/${Cypress.env('userId')}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`
        }
    }).then(response => {
        expect(response.status).to.eq(204)
    })

})

Cypress.Commands.add('generateToken', user => {

    const payload =
    {
        userName: user.name,
        password: user.password
    }

    cy.api({
        method: 'POST',
        url: '/Account/v1/GenerateToken',
        body: payload
    }).then(response => {
        expect(response.status).to.eq(200)
        Cypress.env('token', response.body.token)
    })

})


Cypress.Commands.add('authorized', user => {
    
    const payload =
    {
        userName: user.name,
        password: user.password
    }

    cy.generateToken(user)

    cy.api({
        method: 'POST',
        url: '/Account/v1/Authorized',
        body: payload
    }).then(response => {
        expect(response.status).to.eq(200)
    })

})