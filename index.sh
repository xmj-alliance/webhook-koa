#!/bin/sh
# This file is used to change permission for a normal user on docker container run.


username=$EXEC_USER

# Add local user

userid=${EXEC_USER_ID}

echo "Installing additional packages ...";
# -> List your additionally needed packages in actions/package.list
xargs apk add < "actions/package.list";

echo "Summoning $username - UID:$userid ..."
adduser $username -u $userid -D -s /bin/sh
chown -R $username /workspace
chmod -R 755 /workspace

su-exec $username "$@"


