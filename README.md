Amity Server
=========================

[![NPM](https://nodei.co/npm/amity.png?downloads=true&stars=true)](https://nodei.co/npm/amity/)

## Amity - a web-based database admin server 

# NOT YET FULLY FUNCTIONAL
After making a JavaScript app duplicating functionality of the mongo-express project, I realized the potential for this app is far greater than just a MongoDB manager.  I started the year off with a grand-slam feature creep: Amity will manage multiple servers of different types (SQL, MongoDB, then more).  If you need a MongoDB manager right away, please use mongo-express.


Amity uses Node.js and FeathersJS on the server, CanJS and Steal on the client.  
It currently only supports MongoDB.

Features & Development Plan can be found in the [AmityApp repo](https://github.com/marshallswain/AmityApp)
 

### The Configuration Store

If an adapter is passed in the amity() function at startup, it will automatically be setup as the configuration store. 

![Mind Map of Current Plans](http://i.imgur.com/A6b2cdY.png)

Limitations
-----------

- Until version 1.0, this shouldn't be installed on a publicly-accessible server.

**Amity should only be used privately, for development purposes. The web interface can be used for executing malicious javascript on the MongoDB server. This will be improved by version 1.0.** 

**You can still access remote database servers, but it is highly recommended that your local machine is not available for remote web access while Amity is running.**

Installation
-----------
See the [AmityApp repo](https://github.com/marshallswain/AmityApp)


## License

[MIT](http://opensource.org/licenses/MIT)

## Author

[Marshall Thompson](https://github.com/Glavin001)