const jwt=require("jsonwebtoken");
// require('dotenv').config();

function generateToken(user)
{
    const token=jwt.sign({id: user._id, role: user.role },process.env.JWT_key,{algorithm:"HS256",expiresIn:"1h"});
    return token;
}

module.exports={generateToken}; 