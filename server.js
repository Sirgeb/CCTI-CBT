import express from 'express';
import path from 'path';

const app = express();

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
