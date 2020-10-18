import * as express from 'express';
import * as bodyParser from 'body-parser';

const apiRouter = require('./routes/apiRouter');
const app = express();
const PORT = 3000;

//body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route handler
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req,res) => res.sendStatus(404));

// 400 errors
app.use(function (err, req, res, next) {
    let defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    }
    let errorObj = Object.assign({}, defaultErr, err)
    res.status(errorObj.status).json(errorObj.message);
})
  
app.listen(PORT);

module.exports = app;