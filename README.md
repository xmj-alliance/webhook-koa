# webhook-koa
Highly customizable webhook powered by node.js koa. Automatically executes bash scripts and JavaScript on remote POST request.

## OS requirement
This program supports Linux only (probably macOS as well) since it's originally been designed as a program running in docker containers.
- However, you can make it support Windows by changing POST actions written in `index.js`, inserting another `execSync('.\actions\actions.bat', ... )` code.

## Preparation
- If you decide to run bash scripts, then create an "actions.sh" in `/actions` folder. You may follow the given example there.
- To run post action JavaScript:
  - Create an "actions.js" in `/actions` folder. Please follow the example there as well.
  - You are encouraged to create a `package.json` under `/actions` folder if your js actions involve external node libraries.
  
## Up and running
After preparation, there are two ways to set this up:
- Via Docker: 
``` bash
  docker build . -t webhook-koa --build-arg username=$USER
  docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER -v /path/to/your/source/code:/src webhook-koa
  # or when "/src" is in another docker container:
  # docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER --volumes-from [Container_ID] webhook-koa
```
- Manually:
``` bash
  npm install
  cd actions
  npm install
  cd ..
  npm start
```

After this program runs up, send a POST request to `http://[Your IP]:14546/payload`, and it will automatically execute given command sequence.

## License
MIT
