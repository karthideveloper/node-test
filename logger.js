const path=require("path")
const os=require("node:os")
const fs=require('node:fs')



const log=(massage)=>{
console.log(massage)
console.log(os.freemem())
console.log(os.totalmem())
console.log(path.parse(__filename))
fs.readdirSync('./')
fs.readdir('./',(err,res)=>{
if(!err){
    console.log(res)
}
})

}


module.exports=log;