const {logEvents} = require('./LogEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}\t${err.message}`, 'errorLog.txt');
    res.status(500).json({error: err.message});
}

module.exports = errorHandler;