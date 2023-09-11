//socket app
import React, {useState, useEffect} from 'react';
import SocketIOClient from 'socket.io-client';
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line} from 'recharts';


function App() {
  
  const [dados, setDados] = useState([]);

  useEffect(()=>{
    const socket = SocketIOClient("http://127.0.0.1:4001/");

    socket.on("message",(data)=>{
      console.log("DATA",data);
      setDados(data);
    })

    

  },[]);

  return (
    <div>

      <h3>Temperatura e Humidade</h3>
      <LineChart
        width={1800}
        height={800}
        data={dados}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="hora"/>
        <YAxis domain={[10, 80]}/>
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="temp" stroke="#ff7300" isAnimationActive={false} strokeWidth={4}/>
        <Line type="monotone" dataKey="hum" stroke="#387908" isAnimationActive={false} strokeWidth={4}/>
      </LineChart>

    </div>
  );
}

export default App;
