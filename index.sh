#!/bin/sh
# This file is used to change permission for a normal user on docker container run.


username=$EXEC_USER

# Add local user

userid=${EXEC_USER_ID}

echo "Installing additional packages ...";
# -> Install packages from actions/package.list in actions folder
apk update
xargs apk add < "/workspace/actions/package.list";

echo "Collecting additional node modules ...";
# -> collect node modules from provided package.json in actions folder
cd /workspace/actions
npm install
cd /workspace

echo "Summoning $username - UID:$userid ..."
adduser $username -u $userid -D -s /bin/sh
chown -R $username /workspace
chmod -R 755 /workspace

su-exec $username "$@"


