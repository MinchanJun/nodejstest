import * as express from 'express';

const parseController = require('../controller/parseController');
const router = express.Router();

router.post('/v1/parse', parseController.v1Parse, (req, res) => {

    return res.status(200).json({
        statusCode: 200, 
        data: res.locals.data
    });
});

router.post('/v2/parse', parseController.v2Parse, (req, res) => {

    return res.status(200).json({
        statusCode: 200, 
        data: res.locals.data
    });
});

module.exports = router;