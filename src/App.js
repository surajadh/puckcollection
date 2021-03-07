import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// var / let / const
// == / ====

// If it finds device we should list the device
// Turn on/off the device LED

console.log('TEST=================')

const onClickConnect = (connection) => () => {
  console.log(connection.device.id, "Sending LED.toggle()");
  connection.write("\x10LED.toggle()\n");
}

const connectDevices = (connections, setConnections) => () => {
  window.Puck.connect(function(connection) {

    console.log('Connection=========')
    //devices.push(connection.device)
    if (connection===null) {
      console.log("Connection failed!");
      return;
    }
    const newConnections = new Map(connections).set(connection.device.id, connection)
    setConnections(newConnections)
    console.log(newConnections)
    // Work out a connection number so we can display it on the screen
    // conId/conName are local variables (like connection) so there will
    // be copies of these for each device that is connected to.
    // Add an HTML line for the device with a button
   // document.getElementById("devices").append(div);
    // reset the device and upload code to print the temperature every second (and reset when we disconnect)
    // connection.write("\x03\x10reset();\n", function() {
    //     connection.write("\x10Puck.accelOn();Puck.on('accel', function (v) {Bluetooth.println(JSON.stringify({timestamp: Date.now(), data: Puck.accel()}));});NRF.on('disconnect',()=>reset());\n", function() {  
    //         console.log(conName, "connected successfully");
    //     });
    // });
    // When the button is pressed, send a command to toggle the LED
    // document.getElementById("btn"+conId).addEventListener('click', event => {
    //   console.log(conName, "Sending LED.toggle()");
    //   connection.write("\x10LED.toggle()\n");
    // });
    
    // When the button is pressed, send a command to toggle the LED
    // document.getElementById("logData").addEventListener('click', event => {
      
      // console.log(localStorage.getItem('puckData'));
      // We can make backend call and send data here
    // });

    // document.getElementById("disconnect").addEventListener('click', event => {
    //   window.Puck.accelOff();
    //   // We can make backend call and send data here
    // });
    
    // localStorage.setItem("puckData",'');

    // Handle data coming back
    // var line = "";
    // connection.on('data',function(d) {
    //   // This code detects each new line coming in
    // //   console.log(d.trim());
    //   localStorage.setItem('puckData', localStorage.getItem('puckData') + d.trim());
    //   // For each new line
     

    // });

  });
}

function App() {
const [connections, setConnections] = useState(new Map())

  console.log(Array.from(connections))
  return (
    <div className="App">
      <div>
        Click on connect to connect to a device
      </div>
      <button onClick={connectDevices(connections, setConnections)}>
        Connect
      </button>
      <div>
      {Array.from(connections).map(([_, connection], index) => (
        <div>
          Device {index}: <button id={index} onClick={onClickConnect(connection)}>LED</button>&nbsp;
          <span id={connection.device.id} style={{fontFamily: 'monospace'}}></span>
        </div>        
      ))}
      </div>
    </div>
  );
}

export default App;
