import express from 'express';

const app = express();

app.listen('4000');

const users = [
  'Helen',
  'Alice',
  'Yasmin',
];

app.get('/users', (request, response) => {
  const search = String(request.query.search);

  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

  return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);

  const user = users[id];
});

app.post('/users', (request, response) => {
  const user = {
    name: 'Helen',
    email: 'helen@dev-next.com',
  };

  return response.json(user);
});
