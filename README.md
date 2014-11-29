# InLogger

## Building

`make`

Requirements:
- Docker 1.2 (+compatible kernel)
- sqlite3 (for building the initial database)


## Running

`docker run -p 80:5000 -v ${PWD}/db:/mnt/db inlogger`
