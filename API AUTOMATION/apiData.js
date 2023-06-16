const utilities = require("./utilities.js");
module.exports = {

    endpoints: {
        authentication: "/api-clients",
        listOfBooks: "/books",
        status: "/status",
        order: "/orders",
        orderPage: "/orders/:orderId",
        editOrderPage: "/orders/id=gwX7_b9PX_nYPawbPUCol"
    },
    body: {
        authentication: {
            "clientName": utilities.generateRandomUserName(),
            "clientEmail": utilities.generateRandomEmail()
        },
        createBook: {
            "bookId": 5,
            "customerName": utilities.generateRandomOrderName()
        }
    }
}


