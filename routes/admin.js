const express = require('express');
const News = require('../models/news');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');

        return;
    }

    next();
})

/* GET home page. */
router.get('/', (req, res) => {
    const newsData = new News({
        title: 'Tytul testowy',
        description: 'Opis'
    });

    newsData.save(error => {
        console.log(error);
    })

    res.render('admin', {
        title: 'Admin'
    });
});

module.exports = router;