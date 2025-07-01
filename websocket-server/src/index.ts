import WebSocket,{WebSocketServer} from 'ws';
import { createServer } from 'http';


const server = createServer();

const WebSocketInstance = new WebSocketServer({ server });


WebSocketInstance.on('connection', (ws:WebSocket) => {
  console.log(`Client ${WebSocketInstance.clients.size} connected`);
  
  ws.on('message', (message) => { 
    WebSocketInstance.clients.forEach(client => {
        if ((client !== ws )&& (client.readyState === WebSocket.OPEN)) {
            client.send(`Broadcast: ${message}`);
        }
    }
)
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


server.listen(8080, () => {
    console.log('WebSocket server is listening on port 8080');
  });