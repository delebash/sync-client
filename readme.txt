run fron config.json dir

sync-server --path "./" start

Note the requestID info:  is for websockets, see http://alabor.me/articles/request-response-oriented-websockets/

The sync-client uses http not websockets so you get this info that there is no request id, it is ok