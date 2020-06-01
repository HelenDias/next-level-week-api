import express from 'express';

const app = express();

app.listen('4000');

app.get('/users', () => {
  console.log('Listagem de usuários');
});
