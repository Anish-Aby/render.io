const app = require("./app");

// Server setup
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`✅ Server running in port ${PORT}`);
});
