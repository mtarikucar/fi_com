const moment = require('moment')

module.exports = {
    generateDate: (date, format) => {
        return moment(date).format(format)
      }
}

// generate date dosyası olmadan helper js in yeni versiyonlarında çalışmıyor