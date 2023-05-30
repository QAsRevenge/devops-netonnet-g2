import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

function handleRequest(req, res) {
  res.json('Hello World');
}

app.get('/', handleRequest);

app.get('/api/message', (req, res) => {
  res.json('Hello from the API!');
});

app.listen(port, () => console.log('Server running on port ' + port));