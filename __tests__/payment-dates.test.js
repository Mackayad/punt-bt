const paymentDates = require('../src/payment-dates')

describe("#calculatePaymentDates", () => { 
    const numberOfMonthsToTest = [12, 24, 0, -5, 60, 333]
    numberOfMonthsToTest.forEach(numberOfMonths => {
        test(`${numberOfMonths} months should return an array with a length of ${numberOfMonths <= 0 ? 0 : numberOfMonths}`, () => {
            expect(paymentDates.calculatePaymentDates(numberOfMonths).length).toEqual(numberOfMonths <= 0 ? 0 : numberOfMonths)
        })
    })

    test("Should return both base payment date and bonus payment date", () => {
        const dates = paymentDates.calculatePaymentDates(1)
        const firstPaymentDate = dates[0]
        expect(firstPaymentDate).toHaveProperty("base_payment")
        expect(firstPaymentDate).toHaveProperty("bonus_payment")
    })
})

describe("#getDateWithWeekendOffset", () => {
    const testBasePaymentDates = [
        {
            date: new Date(2020, 9, 1),
            expectedOutputDate: 30,
            expectedOutputMonth: 9,
            expectedOutputYear: 2020
        },
        {
            date: new Date(2020, 11, 1),
            expectedOutputDate: 31,
            expectedOutputMonth: 11,
            expectedOutputYear: 2020
        },
        {
            date: new Date(2021, 1, 1),
            expectedOutputDate: 26,
            expectedOutputMonth: 1,
            expectedOutputYear: 2021
        },
        {
            date: new Date(2021, 0, 1),
            expectedOutputDate: 29,
            expectedOutputMonth: 0,
            expectedOutputYear: 2021
        }
    ]
    testBasePaymentDates.forEach(date => {
        test(`${date.date} base payment should be paid on ${date.expectedOutputDate}/${date.expectedOutputMonth+1}/${date.expectedOutputYear}`, () => {
            const paymentDate = paymentDates.getDateWithWeekendOffset(date.date, 0, 0, -1, -2)
            expect(paymentDate.getDate()).toEqual(date.expectedOutputDate)
            expect(paymentDate.getMonth()).toEqual(date.expectedOutputMonth)
            expect(paymentDate.getFullYear()).toEqual(date.expectedOutputYear)
        })
    })

    const testBonusPaymentDates = [
        {
            date: new Date(2020, 9, 1),
            expectedOutputDate: 18,
            expectedOutputMonth: 10,
            expectedOutputYear: 2020
        },
        {
            date: new Date(2020, 11, 1),
            expectedOutputDate: 15,
            expectedOutputMonth: 0,
            expectedOutputYear: 2021
        },
        {
            date: new Date(2021, 0, 1),
            expectedOutputDate: 15,
            expectedOutputMonth: 1,
            expectedOutputYear: 2021
        },
        {
            date: new Date(2021, 3, 1),
            expectedOutputDate: 19,
            expectedOutputMonth: 4,
            expectedOutputYear: 2021
        }
    ]
    testBonusPaymentDates.forEach(date => {
        test(`${date.date} bonus payment should be paid on ${date.expectedOutputDate}/${date.expectedOutputMonth+1}/${date.expectedOutputYear}`, () => {
            const paymentDate = paymentDates.getDateWithWeekendOffset(date.date, 15, 0, 4, 3)
            expect(paymentDate.getDate()).toEqual(date.expectedOutputDate)
            expect(paymentDate.getMonth()).toEqual(date.expectedOutputMonth)
            expect(paymentDate.getFullYear()).toEqual(date.expectedOutputYear)
        })
    })
})

describe("#formatPaymentDatesToCsv", () => {

    const testDatesArray = [
        {base_payment: "29/01/2021", bonus_payment: "15/02/2021"},
        {base_payment: "26/02/2021", bonus_payment: "15/03/2021"}
    ]
    
    test("Payment dates should be formatted as CSV", () => {
        expect(paymentDates.formatPaymentDatesToCsv(testDatesArray)).toEqual('payment_type,payment_date\nbase_payment,29/01/2021\nbonus_payment,15/02/2021\nbase_payment,26/02/2021\nbonus_payment,15/03/2021')
    })

})