import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import multer from 'multer'
import { mainLLMCall } from './llm-chain.js';

const upload = multer();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.post('/api/report', upload.any(), async (req: Request, res: Response) => {
  try {
    const report = await mainLLMCall(req);
    res.json(report);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).send('An error occurred while generating the report.');
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});