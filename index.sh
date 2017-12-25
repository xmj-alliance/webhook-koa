#!/bin/sh
# This file is used to change permission for a normal user on docker container run.


username=$EXEC_USER

# Add local user

userid=${EXEC_USER_ID}

echo "Summoning $username - UID:$userid"
adduser $username -u $userid -D -s /bin/sh
# usermod -o -u $userid $username
# useradd --shell /bin/sh -u $userid -o -c "" -m user
# export HOME=/home/user
chown -R $username /workspace
chmod -R 755 /workspace
su-exec $username /bin/sh
exec su-exec $username "$@"

