import express from 'express';
import cors from 'cors';
import { initDb } from './db';
import projectsRouter from './projects';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/projects', projectsRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); 