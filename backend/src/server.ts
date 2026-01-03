import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { setUp } from './services/socket.service';
import dotenv from "dotenv";

// Load env
dotenv.config();
// routes imports
import upload from './api/upload/upload.routes'
import demoData from './api/demoData/demoData.routes'
import docxConverter from './api/mammothDocxConverter/mammoth.routes'
import sayHello from './api/helloWorld/hello.routes'

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());


const corsOptions = {
    origin: ['http://127.0.0.1:5500'],
    credentials: true
}
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    app.use(cors(corsOptions))
}

 //ROUTES 
app.use('/api', upload)
app.use('/api', demoData)
app.use('/api', docxConverter)
app.use('/api', sayHello)

// Serve frontend in production
// app.get('/**', (req:Request, res:Response) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  setUp(server, corsOptions);
});
