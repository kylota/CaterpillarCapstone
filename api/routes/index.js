var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Caterpillar Capstone' });
});

module.exports = router;
