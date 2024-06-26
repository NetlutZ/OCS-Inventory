const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(messgae, logName)=>{
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const log = `${dateTime}\t${uuidv4()}\t${messgae}\n`;
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), log);
    } catch(err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'log.txt');
    next();
}

module.exports = {logger, logEvents};