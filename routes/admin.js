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
    res.render('admin/index', {
        title: 'Admin'
    });
});

// Add news
router.get('/news/add', (req, res) => {
    res.render('admin/news-form', {
        title: 'Dodaj news',
        body: {},
        errors: {}
    })
});

router.post('/news/add', (req, res) => {
    const body = req.body;
    const newsData = new News(body);
    const errors = newsData.validateSync();

    newsData.save(error => {
        console.log(error);
    })
    res.render('admin/news-form', {
        title: 'Dodaj news',
        body,
        errors
    });
})

module.exports = router;