import express from 'express';
import cors from 'cors';

const app = express();

app.listen('4000');
app.use(express.json());
app.use(cors());

const users = [
  'Helen',
  'Alice',
  'Yasmin',
];

app.get('/users', (request, response) => {
  const search = request.query.search;

  const filteredUsers = !!search
    ? users.filter(user => user.includes(String(search)))
    : users;

  return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);

  const user = users[id];
});

app.post('/users', (request, response) => {
  const data = request.body;

  const user = {
    name: data.name,
    email: data.email,
  };

  return response.json(user);
});
