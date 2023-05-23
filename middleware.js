const TestMiddileWare=(req,res,next)=>{
console.log("Test Middleware")
next();
}

module.exports=TestMiddileWare;