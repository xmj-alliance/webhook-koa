# webhook-koa
Highly customizable webhook powered by node.js koa. Automatically executes bash scripts and JavaScript on remote POST request. Availabe as a docker image based on `alpine:edge`, acting as a simple workflow.

## OS requirement
This program supports Linux only (probably macOS as well) since it's originally been designed as a program running in docker containers.
- However, you can make it support Windows by changing POST actions written in `index.js`, inserting another `execSync('.\actions\actions.bat', ... )` code.

## Preparation
- If you decide to run bash scripts:
  - Create an `actions.sh` in `/actions` folder. You may follow the given example there.
  - (Optional) Create a `package.list` file in `/actions` as well, then list your additional system packages there, each entry taking up one line. For example, you are going to execute `git pull` but there is no `git` pre installed in Alpine linux, so in your `package.list`, you have to list:
  ```
  git
  ```
    - Please note that comments are currently not supported in that list.
- To run post action JavaScript:
  - Create an `actions.js` in `/actions` folder. Please follow the example there as well.
  - (Optional) You are encouraged to create a `package.json` under `/actions` folder if your js actions involve external node libraries.
  
## Up and running
After preparation, there are two ways to set this up:
- Via Docker: 
``` bash
  docker build . -t webhook-koa
  docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER -e EXEC_USER_ID=$UID -v /path/to/your/source/code:/src webhook-koa
  # or when "/src" is in another docker container:
  # docker run -d -p 14546:14546 --name webhook-koa-c1 -e EXEC_USER=$USER -e EXEC_USER_ID=$UID  --volumes-from [Container_ID] webhook-koa
```
- Manually:
``` bash
  npm install
  cd actions
  npm install
  cd ..
  npm start
```

After this program runs up, send a POST request to `http://[Your IP]:14546/payload`, and it will automatically execute the given command sequence.

## License
MIT
