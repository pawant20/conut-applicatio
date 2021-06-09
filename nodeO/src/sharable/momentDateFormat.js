const moment = require('moment');

module.exports = formatDates = (date) => {
    return moment(date).format('YYYY-MM-DD');
}