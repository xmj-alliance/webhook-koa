// const { exec } = require('child_process');
// // const { promisify } = require('util');
// const { spawn } = require('child_process');
// const { promisify } = require('util');

// const spawnAsync = promisify(spawn);
// const execAsync = promisify(exec);
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


// const payloadcmd = (ctx) => {
//   return new Promise((resolve, reject) => {
//     const cmd = spawn('./commands.sh', [], {});
//     cmd.stderr.on('data', (data) => {
//       console.log(`stderr: ${data}`);
//       ctx.status = 500;
//       ctx.body = {
//         msg: "Failed to execute command, githubo!"
//       }
//     });
//     cmd.on('close', (code) => {
//       console.log(`child process exited with code ${code}`);
//       resolve(code);
//     })
//   });
// }

router.get('/', async (ctx) => {
  ctx.body = "> just touched root."
});

router.post('/payload', async (ctx) => {

  // try {
  //   await execAsync('./commands.sh');
  // } catch (error) {
  //   ctx.status = 500;
  //   ctx.body = {
  //     msg: "Failed to execute command, githubo!"
  //   }
  // }
  // const cmd = await spawn('./commands.sh', [], {});
  // cmd.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  //   ctx.status = 500;
  //   ctx.body = {
  //     msg: "Failed to execute command, githubo!"
  //   }
  // });

  // await payloadcmd(ctx);
  // try {
  //   await spawnAsync('./commands.sh', [], {});
  // } catch (error) {
  //   console.error(error);
  //   ctx.status = 500;
  //   ctx.body = {
  //     msg: "Failed to execute command, githubo!"
  //   }
  // }
  // console.log("cmd ok");

  // if (error instanceof Error || stderr) {
  //   console.log('stderr:', stderr);

  // }

  // let koasb = false;

  // await execAsync('./commands.sh', async (error, stdout, stderr) => {

  //   if (error instanceof Error || stderr) {
  //     console.log('stderr:', stderr);
  //     koasb = true;
  //     return;
  //     // ctx.status = 500;
  //     // ctx.body = {
  //     //   msg: "Failed to execute command, githubo!"
  //     // }
  //     // ctx.throw(500, 'command failed to execute.');
  //   }
  //   // process.stderr.write(stderr)
  //   // process.stdout.write(stdout)
  //   return;
  // });



  // if (koasb) {
  //   console.error("koa shi ge da sb");
  //   ctx.status = 500;
  //   ctx.body = {
  //     msg: "Failed to execute command, githubo!"
  //   }
  // }

  // let koasb = false; // koa fails to properly return context status in try catch block
  // which freaking pisses me off!
  // try {
  //   execSync('./commands.sh', (error, stdout, stderr) => {
  //     process.stderr.write(stderr);
  //     process.stdout.write(stdout);
  //   });
  // } catch (error) {
  //   koasb = true;
  // }

  // if (koasb) {
  //   ctx.status = 500;
  //   ctx.body = {
  //     msg: "Failed to execute command, githubo!"
  //   }
  //   console.log("koa shi ge da sb")
  //   return;
  // }
  try {
    execSync('./commands.sh', (error, stdout, stderr) => {
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