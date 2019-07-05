# JS Evolution

A collection of five scripts that demonstrate how JavaScript control flow has evolved 
from nested callbacks to promises to async & await.

### Database API

The example scripts interact with a *mock* Database API. The API consists of three functions (`initialize`, `run`, and `each`) that expect a callback. 

Each example script follows the same logic: starting the database with `initialize`, calling `run` to execute a create table statement, and selecting rows and printing them with `each`.

### Script Arguments 

To simulate errors, the scripts take three command line options. 

* `-i` the `initialize` call will fail
* `-c` the `run` call will fail  
* `-s` the `each` call will fail

```bash
node pyramid.js -c
INFO: Initialized database
ERROR: Invalid create table statement
```

## Pyramid of Doom

Demonstrates program flow with nested callback functions.

```bash
$ node pyramid.js 
```

## Callback Functions

Demonstrates program flow with explicitly named callback functions.

```bash
$ node callback-funcs.js  
```

## Promises 

 Demonstrates program flow with promise chaining by wrapping each of the database's callbacks in a custom promise.

 ```bash
$ node promises.js
 ```

 ## Promisify 

 Demonstrates program flow with promise chaining by wrapping each of the database's callbacks in a promise using promisify.

 ```bash
$ node promisify.js 
 ```

 ## Async & Await

 Demonstrates program flow using async & await.

 ```bash
$ node async.js  
 ```
