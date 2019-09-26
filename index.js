const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io")
const bodyParser = require("body-parser")

const port = process.env.PORT || 5000
let server = http.createServer(app);
let io = socket(server);
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    
    res.sendFile(__dirname + "/Index.html")
})

io.on("connection",(socket)=>{
    console.log("connected");
    
    socket.on('location', (location)=>{
        io.emit('location', location);
      });

    socket.on("disconnect",(socket)=>{
        console.log("disconnected");
        
    })

    socket.on("declined",(error)=>{
        console.log("connection refused , not allowed or unsupported browser");
    })
})




server.listen(port,()=>{
    console.log(`server is on on port ${port}`);
    
})