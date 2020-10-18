import { Request, Response, NextFunction } from "express";

const parseController: any = {};

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * Middleware to parse api end point from /api/v1/parse
 */
parseController.v1Parse = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const { data }: any = req.body;

    if(!data){
        return next({
            log: 'parseController.v1Parse: ERROR: Error getting data from the requested body',
            message: { err: 'Error occurred in parseController.v1Parse. Data in the body is empty. Check server logs for more details.' },
        });
    }
    
    const tempArr = [];
    let str = '';
    for(let i = 0; i < data.length; i++) {
        str += data[i];
        if((data[i] === '0' && data[i+1] !== '0') || data[i+1] === undefined) {
            tempArr.push(str);
            str = '';
        }
    }
    
    res.locals.data = { firstName: tempArr[0], 
                        lastName: tempArr[1],
                        clientId: tempArr[2]
    }

    return next();
}

/**
 * 
 * @param req 
 * @param res 
 * @param next
 * Middleware to parse api end point from /api/v2/parse
 */
parseController.v2Parse = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const { data }: any = req.body;
    
    if(!data){
        return next({
            log: 'parseController.v2Parse: ERROR: Error getting data from the requested body',
            message: { err: 'Error occurred in parseController.v2Parse. Data in the body is empty. Check server logs for more details.' },
        });
    } 

    const tempArr = [];
    let str = '';
    for(let i = 0; i < data.length; i++) {
        if(data[i] !== '0') str += data[i];

        if((data[i] !== '0' && data[i+1] === '0') || data[i+1] === undefined) {
            tempArr.push(str);
            str = '';
        }
    }

    tempArr[2] = tempArr[2].slice(0,3) + '-' + tempArr[2].slice(3);
    
    res.locals.data = { firstName: tempArr[0], 
        lastName: tempArr[1],
        clientId: tempArr[2]
    }   


    return next();
}
module.exports = parseController;