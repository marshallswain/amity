
/**
 * A service to inform which servers are set up.
 */
var serverService = {

  // Returns a list of connected services.
  find: function(params, callback) {
    callback(null, amity.serverList);
  },

  /**
   * Note that the id argument has been hijacked to use as a method name.
   *
   * The "status" method returns the server status for the passed in hostname.
   * params.hostname is the only requirement.
   * The adapter must have a getStatus function for this to work.
   */
  get: function(method, params, callback) {

    // The "status" method
    if (method === 'status') {

      var hostname = params.query.hostname;

      // Make sure params.hostname was passed in.
      if (!hostname) {
        return callback('ERROR: You must pass in a hostname attribute.');
      }

      // If a server exists with this hostname...
      if (amity.servers[hostname]) {
        // And it has a getStatus method...
        if (amity.servers[hostname].getStatus) {
          amity.servers[hostname].getStatus(function(status){
            var data = {
              hostname: hostname,
              status:status
            };
            callback(null, data);
          })
        } else {
          callback('ERROR: The server at ' + hostname + ' does not have a getStatus method.');
        }

      } else {
        // Otherwise, send an error message to the client.
        callback('ERROR: An adapter for a server at ' + hostname +' does not exist.')
      }

      // Get the matching adapter.

    // A supported method was not used.
    } else {
      // Send an error message to the client.
      callback('ERROR: The "' + method + '" method is not supported. '+
        '"status" is the only currently-supported option.');
    }

  },

  /**
   * Connects a new server.
   * @param  {[type]}   data     [description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  create: function(data, params, callback) {
    // Must have at least connect and type data.
    if (data.uri && data.type) {


      // See if there is a matching adapter.
      var match;
      var types = Object.keys(amity.adapters);
      // Use toLowerCase() to simplify.
      for (var i = types.length - 1; i >= 0; i--) {
        if (types[i].toLowerCase() === data.type.toLowerCase()) {
          match = types[i];
        }
      }
      // If we didn't find a match...
      if (!match) {
        // ... return and let the let the client know.
        return callback('ERROR: Could not find a registered adapter of type ' + data.type);
      }

      // Retrieve the adapter.
      var Adapter = amity.adapters[match];
      // Use it.
      var server = amity.use(new Adapter(data.uri));

      console.log(server);

      return callback(null, server);
    } else {
      return callback('ERROR: Must provide connect and type attributes.');
    }
  }
};
module.exports = serverService;