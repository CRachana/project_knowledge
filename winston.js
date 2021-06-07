const winston = require('winston');
var  moment =require('moment');
const logger =winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});
logger.info('Information!');
logger.warn('Warning!');
logger.error('Error!');


logger.configure({
    level: 'error' ,
    transports: [
        new winston.transports.Console()
    ]
});
logger.info('New Information!');
logger.warn('New Warning!');
logger.error('New Error!');
console.log(moment().format('dddd'));
