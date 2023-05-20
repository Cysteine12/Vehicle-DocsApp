const moment = require('moment')

module.exports = { 
    inc: (value) => parseInt(value)+1,
    formatDate: (date, format) => {
        return moment(date).format(format)
    },
    vuejs: (options) => { return options.fn() }
}