const Logger=require('./logger') 
const L=new Logger();

const http=require('http')
const server=http.createServer((req,res)=>{
if(req.url==="/"){
    res.write("hello  world");
    res.end();
}
if(req.url==="/api"){
    res.write(JSON.stringify([1,2,3,4,5]))
    res.end()
}
});

// server.on('connection',(socket)=>{
// console.log("new Connection")
// })

server.listen(3000)
console.log("listening on 3000")
// L.on('messageLogged',(args)=>{
//     console.log("hiiii",args)
// })

// L.log('hi');
