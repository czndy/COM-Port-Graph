const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { SerialPort, ReadlineParser } = require('serialport');
const path = "COM4"
const baudRate = 9600;
const arduinoPort = new SerialPort({ path, baudRate });
const parser = new ReadlineParser();
arduinoPort.pipe(parser);


        


const port = 4001;

const app = express();

const httpServer = http.createServer(app);


const server = new socketio.Server(httpServer,{
    cors:{
        origin: "*"
    }
})



server.on("connection",(socket)=>{

    let arrData = [];
    let temp = "";
    let hum = "";

    parser.on('data', (data)=>{
        temp = data.substring(6, 11);
        hum = data.substring(25, data.length-1);
        let dataHoje = new Date();
        let horas = dataHoje.getHours() + ":" + dataHoje.getMinutes() + ":" + dataHoje.getSeconds()

        if(arrData.length > 100){
            arrData.reverse().pop();
            arrData.reverse();
        }
        arrData.push({"temp":parseFloat(temp).toFixed(1),"hum":parseFloat(hum).toFixed(1), "hora":horas});

        if(arrData.length > 1){
            console.log(arrData);
            socket.emit("message",arrData);
        }
    });
    
});


httpServer.listen(port);


