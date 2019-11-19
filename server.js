const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// ------------------------------------- Routes ------------------------------------- //

app.get('/', (req, res) => {
  res.send('<h1>AUTH API</h1>');
});

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));
