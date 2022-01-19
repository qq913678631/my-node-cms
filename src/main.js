const app = require('./app')
const connections = require('./app/database')
const { APP_PORT } = require('./app/config')

app.listen(APP_PORT, () => {
  console.log(`${ APP_PORT }端口启动啦~`);
});
