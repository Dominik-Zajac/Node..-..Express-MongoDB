const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', (req, res) => {
    const show = !req.session.votes;

    Quiz.find({}, (err, data) => {
        let sum = 0;
        data.forEach(item => {
            sum += item.votes;
        });

        res.render('quiz', {
            title: 'Quiz',
            data,
            show,
            sum
        });
    })
});

router.post('/', (req, res) => {
    const id = req.body.quiz;

    Quiz.findOne({
        _id: id
    }, (error, data) => {
        data.votes = data.votes + 1;
        data.save((error) => {
            req.session.votes = 1;

            res.redirect('/quiz');
        })
    })
})

module.exports = router;