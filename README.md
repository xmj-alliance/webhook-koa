[![Docker Stars](https://img.shields.io/docker/stars/valorad/webhook-koa.svg?style=flat-square)](https://hub.docker.com/r/valorad/webhook-koa/)

# webhook-koa
Highly customizable webhook powered by node.js koa. Automatically executes bash scripts and JavaScript on remote POST request. Available  as a docker image based on `alpine:latest`, acting as a simple workflow.

## OS requirement
This program supports Linux only (probably macOS as well) since it's originally been designed as a program running in docker containers.
- However, you can make it support Windows by changing POST actions written in `index.js`, inserting another `execSync('.\actions\actions.bat', ... )` code.

## Preparation for actions on POST
- Find the `./actions` folder in this repo, or create an `actions` folder somewhere in your file system if running from docker image.
- If you decide to run bash scripts:
  - Create an `actions.sh` in `actions` folder. You may follow the given example in this repo.
  - (Optional) Create a `package.list` file in `actions` as well, then list your additional system packages there, each entry taking up one line. 

```
git
nice-packageA
potato
sugar
kitten
```

  For example, you are going to execute `git pull` but there is no `git` pre installed in Alpine Linux, so in your `package.list`, you have to list `git` out.
  
  Please note that comments are currently not supported in that list.

- To run post action JavaScript:
  - Create an `actions.js` in `actions` folder. Please follow the example there as well.
  - (Optional) You are encouraged to create a `package.json` under `actions` folder if your js actions involve external node libraries.
  
## Up and running
After preparation, there are two ways to set this up:
- Via Docker: 
``` bash
  docker run -d -p 14546:14546 --name webhook-koa-c1 \
  -e EXEC_USER=$USER -e EXEC_USER_ID=$UID \
  -v /path/to/your/source/code:/src \
  -v /path/to/actions:/workspace/actions \
  valorad/webhook-koa
  # or when "/src" is in another docker container, but make sure you have access permission:
  # docker run ... --volumes-from [Container_ID] ... valorad/webhook-koa
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
