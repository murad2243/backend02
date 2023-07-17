const jwt = require("jsonwebtoken")



async function authMiddleware(req,res,next){

    try {
        const token = req.headers.authentication?.split(" ")[1]
        console.log(token);
        if(!token){
            res.send("Please provide token")
        }else{
            const decode = await jwt.verify(token,"key")
            if(!decode){
                res.status(400).send("token is invalid")
            }
            else{
                req.userName = decode.userName
                next()
            }
        }



        
    } catch (error) {
        console.log(error);
    }

}

module.exports = authMiddleware