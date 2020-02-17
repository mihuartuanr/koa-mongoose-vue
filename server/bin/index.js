const app = require('../app');
const Server = require('../config/server');

const {host, port} = Server;

app.listen(port, host, () => {
  console.log(`server is running at http://${host}:${port}`);
})
