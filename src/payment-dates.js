module.exports = {

    /**
     * Calculates payment dates for a specified number of months and returns an object with properties
     * base_payment and bonus_payment formatted based on the provided dateFormat
     * @param {*} numberOfMonths | The number of months to calculate payment dates for
     * @param {*} dateFormat | The format to output the calculated dates in
     */
    calculatePaymentDates: (numberOfMonths, dateFormat = "en-GB") => {
        const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
        return (numberOfMonths <= 0) ? [] : [...Array(numberOfMonths).keys()].map(monthOffset => {
            const startDate = new Date()
            return {
                base_payment: module.exports.getDateWithWeekendOffset(startDate, 0, monthOffset, -1, -2).toLocaleDateString(dateFormat, dateOptions),
                bonus_payment: module.exports.getDateWithWeekendOffset(startDate, 15, monthOffset, 3, 4).toLocaleDateString(dateFormat, dateOptions)
            }
        })
    },

    /**
     * Returns a date with offset if it falls on a weekend
     * @param {*} date | The date of the month, or 0 for the last date of the previous month
     * @param {*} monthOffset | How many months to add from today
     * @param {*} saturdayOffset | How many days to add (or subtract) if the specified date falls on a Saturday
     * @param {*} sundayOffset | How many days to add (or subtract) if the specified date falls on a Sunday
     * Note: This is only being exported for unit testing purposes
     */
    getDateWithWeekendOffset: (startDate, date, monthOffset, saturdayOffset, sundayOffset) => {
        let outputDate = new Date(startDate.getFullYear(), startDate.getMonth() +  (monthOffset + 1), date)
        const dayOfWeek = outputDate.getDay()
        if(dayOfWeek === 0 || dayOfWeek === 6) {
            outputDate.setDate(outputDate.getDate() + (dayOfWeek === 6 ? saturdayOffset : sundayOffset))
        }
        return outputDate
    },

    /**
     * Used to output calculated date array in CSV format
     * @param {*} paymentDates | The payment date array with base_payment and bonus_payment properties
     */
    formatPaymentDatesToCsv: (paymentDates) => {
        return `payment_type,payment_date\n${paymentDates.map((date) => {
            return `base_payment,${date.base_payment}\nbonus_payment,${date.bonus_payment}`
        }).join("\n")}`
    }

}