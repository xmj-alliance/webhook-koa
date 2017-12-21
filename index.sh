
if [ $# -ne 1 ]; then
    echo $0: usage: index.sh username
    exit 1
fi

username=$1

chown -R $username /src
chmod -R 755 /src
sudo -u $username /bin/sh

# this file is used to change permission for a normal user on docker container run.
# and comments cannot be put in first line.