import jwt from "jsonwebtoken"


const authenticate = (req, res, next) => {
    // Get token from the request header
    const token = req.headers.authorization;

    // check if token is present
    if(!token){
        return res.status(401).json({error: "Unauthorized: No token provided"});
    }

   try {
    //  Verify token
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    
    // Attach the decodedToken to the user request
    req.user = decodedToken.user;
    console.log("User",decodedToken.user);
    next();
    
   } catch (error) {
return res.status(401).json({error: "Unauthorized: Invalid token provided"})
   } 
}

export default  authenticate;

