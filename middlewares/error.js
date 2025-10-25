


export const errormiddleware = (err,req,res,next) =>{
    err.message = err.message || "internal server error"
    err.statuscode = err.statuscode || 500
    res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}