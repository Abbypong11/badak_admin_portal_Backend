const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    // check if the error has status code
    const statusCode = err.statusCode || 500;


    // Set the statusCode to the response and send back an error  message
    res.status(statusCode).json({
        message: err.message || "Internal  Server Error"
    });
}

export default errorHandler;