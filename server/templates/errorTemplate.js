const errorTemplate = (res, message, errStatus=501) =>{
    return res.status(errStatus).json({
        error: {
            message: message,
            status: errStatus
        }
    })
}
module.exports = errorTemplate;