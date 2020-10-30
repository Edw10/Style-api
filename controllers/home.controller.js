'use strict';

const path = require('path');

function render(file, res) {
    return res.sendFile(path.resolve('public', 'views', `${file}.html`));
}

class HomeController {
    async getView(req, res) {
        return render('index', res);
    };
}

module.exports = new HomeController();