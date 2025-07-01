import express, { Request, Response } from 'express';
import { createClient } from 'redis';
const app = express();
app.use(express.json());
const client = createClient();
client.connect();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

//@ts-ignore
app.post('/submit', async (req:Request, res:Response) => {


  const { userId, problemId, code } = req.body;

  if (!userId || !problemId || !code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }     

try {
    // Simulate code submission processing
    const submissionId = `${userId}-${problemId}-${Date.now()}`;
    await client.lPush("submissions", JSON.stringify({ submissionId,userId, problemId, code }));
    
    // Simulate a delay for processing
    setTimeout(() => {
      console.log(`Submission processed: ${submissionId}`);
    }, 1000);
    
    res.status(201).json({ submissionId });
  }
  catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }   
});  


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});