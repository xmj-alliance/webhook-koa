const { execSync } = require('child_process');
const { existsSync } = require('fs');

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

  // bash script action
  if (existsSync("./actions/actions.sh")) {
    try {
      execSync('./actions/actions.sh', (error, stdout, stderr) => {
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

  } else {
    console.log("No actions.sh provided, no bash script will be executed.");
  }

  // post javascript action
  if (existsSync("./actions/actions.js")) {
    const postAct = require("./actions/actions");
    try {
      postAct();
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = {
        msg: "Failed to execute post js actions."
      }
      return;
    }
  } else {
    console.log("No actions.js provided, we will not perform post JavaScript actions.");
  }

  ctx.status = 200;
  ctx.body = {
    msg: "Successfully executed command sequence."
  }

});

if (existsSync("./actions/ext.js")) {
  const { extAPI } = require("./actions/ext.js");
  router.use('/ext', extAPI.routes(), extAPI.allowedMethods())
}

app.use(router.routes())
.use(router.allowedMethods());

// listen
app.listen(14546, () => {
  console.log("** koa started on port 14546. **");
});

module.exports = {
  app
}