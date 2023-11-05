import * as signalR from "@microsoft/signalr";
import {HttpTransportType} from "@microsoft/signalr";
// import {LogLevel} from "@microsoft/signalr";
import {CustomLogger} from "./customLogger";

var counter = document.getElementById("viewCounter");
//WebSocket = undefined; 

// create connection
let connection = new signalR.HubConnectionBuilder()
   //   .configureLogging(LogLevel.Trace)
    .configureLogging(new CustomLogger())
    .withUrl("/hub/view", {
        transport: HttpTransportType.WebSockets | HttpTransportType.ServerSentEvents
    })
    .build();

// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
    counter.innerText = value.toString();
});

// notify server we're watching
function notify(){
    connection.send("notifyWatching");
}

// start the connection
function startSuccess(){
    console.log("Connected.");
    notify();
}
function startFail(){
    console.log("Connection failed.");
}

connection.start().then(startSuccess, startFail);