const log=require('./logger')
const EventEmitter=require('events');

const emitter=new EventEmitter();

emitter.on('messageLogged',(args)=>{
    console.log("hiiii",args)
})
emitter.emit('messageLogged',{id:1,url:'https'})

log('hi');
