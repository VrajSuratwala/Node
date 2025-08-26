const jwt=require("jsonwebtoken");

function verifyToken(req,res,next)
{
    var token = req.get("Authorization");

    if(!token)
    {
        return res.status(401).json({message:"Token is missing"});
    }
    try{
        token=token.split(" ")[1];
        console.log("Received token:", token); 
        console.log(token);
        const decode=jwt.verify(token,process.env.JWT_KEY);
        console.log("Decoded token:", decode); 
        req.user = decode; 
        next();
    }catch(error)
    {
        return res.status(401).json({message:"Token is Invalid"});
    }
}

module.exports=verifyToken;