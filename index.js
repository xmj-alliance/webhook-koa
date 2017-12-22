const { execSync } = require('child_process');

const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

const rootpath = '/src';

app.use(logger());
app.use(bodyParser());

router.get('/', async (ctx) => {
  ctx.body = "> just touched root."
});

router.post('/payload', async (ctx) => {

  try {
    execSync('./actions.sh', (error, stdout, stderr) => {
      process.stderr.write(stderr);
      process.stdout.write(stdout);
    });
  } catch (error) {
      ctx.status = 500;
      ctx.body = {
        msg: "Failed to execute a command, githubo!"
      }
      return; // <- Super important statement that wasted me a whole afternoon!
  }

  ctx.status = 200;
  ctx.body = {
    msg: "Successfully executed command sequence."
  }

});

app.use(router.routes())
.use(router.allowedMethods());

// listen
app.listen(14546, () => {
  console.log("** koa started on port 14546. **");
});

module.exports = {
  app
}