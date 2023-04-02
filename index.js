const express = require('express');
const app = express();
const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

app.get('/api/data', (req, res) => {1
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
