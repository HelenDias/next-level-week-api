import express from 'express';

const app = express();

app.listen('4000');

app.get('/users', (request, response) => {
  console.log('Listagem de usuários');

  response.json([
    'Helen',
    'Alice',
    'Yasmin',
  ]);
});
