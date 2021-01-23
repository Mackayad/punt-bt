const inquirer = require('inquirer');
const paymentDates = require('./payment-dates')

inquirer.prompt([
    {
        type: "number",
        name: "numberOfMonths",
        message: "How many months would you like to get payment dates for?",
        validate: (input) => input > 0 ? true : "Please enter a value greater than 0"
    },
    {
        type: "list",
        name: "dateFormat",
        message: "What date format would you like to output in?",
        choices: [
            {
                name: "dd/mm/yyyy",
                value: "en-GB"
            },
            {
                name: "mm/dd/yyyy",
                value: "en-US"
            }
        ]
    },
]).then(answers => {
    console.log(paymentDates.formatPaymentDatesToCsv(paymentDates.calculatePaymentDates(answers.numberOfMonths, answers.dateFormat)))
})