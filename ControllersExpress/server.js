import express from 'express';
import placeRoutes from './routes/placeRoutes.js';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is Running...!');
});

app.use('/api/places', placeRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
