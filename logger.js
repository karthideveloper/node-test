const path=require("path")
const os=require("node:os")
const fs=require('node:fs')
const EventEmitter=require('events');
class Logger extends EventEmitter{
  
log(massage){
// console.log(massage)
// console.log(os.freemem())
// console.log(os.totalmem())
// console.log(path.parse(__filename))
// fs.readdirSync('./')
// fs.readdir('./',(err,res)=>{
// if(!err){
//     console.log(res)
// }

// })
this.emit('messageLogged',{id:1,url:'https'})
}

}
module.exports=Logger;