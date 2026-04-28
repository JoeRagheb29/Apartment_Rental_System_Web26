const express = require("express");
const app = express();

const PORT = 5000;

// middleware
app.use(express.json());

// route
app.get("/", (req, res) => {
  res.send(`API is running...`);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
