import jwt from "jsonwebtoken"


function verify(req,res,next){

const token=req.headers.authorization.split(" ")[1]
const decoded=jwt.verify(token,"secret")

console.log("TOKEN USER ID:",decoded.userid)
req.userid=decoded.userid

next()

}
export default verify;