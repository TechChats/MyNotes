const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySecret';


//here the after fetchuser next will run
const fetchuser = (req, res, next)=>{
    // Get the user from the JWT TOKEN and add id to req object
    //getting jwt token form the header
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"No authurised token"})
    }

   try {

     //if token is present verify it with jwt_secret //extracting user from jwt token
     const data = jwt.verify(token, JWT_SECRET);
     req.user = data.user;
     next();
   } catch (error) {
        res.status(401).send({error:"No valid token"})
    
   }

}

module.exports = fetchuser

