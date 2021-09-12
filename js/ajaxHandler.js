/**
 * This is a Class that handles API Calls
 */
 class AjaxHandler {
  /**
   * Receive a URL to make a get API Call
   * 
   * @param {string} path URL to make API
   * @returns {Promise}
   */
  get(path) {
      return this.makeAPICall('GET', path);
  }

  /**
   * Create an Ajax Loader to perform API Calls
   * 
   * @param {string} method GET, POST, PUT, PULL
   * @param {string} path URL to make API
   * @returns {Promise}
   */
  makeAPICall(method, path) {
      return new Promise((resolve, reject) => {
          // MAKE API CALL
          // Prepare a variable for the HTTP request
          // Setup the request variable according the browser
          // XMLHttpRequest: Mozilla, Safari, ...
          // ActiveXObject: IE
          const request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

          // When the state of the request changes, do something
          request.onreadystatechange = () => {
              // if the case is 4 => completed
              if (request.readyState === 4) {
                  if (request.status == 200) {
                      // IS SUCCESS
                      resolve(JSON.parse(request.responseText));
                  } else {
                      // AN ERROR OCCURED
                      reject({
                          status: request.status,
                          message: 'Sorry, Something went wrong'
                      });
                  }
              }
          };

          // Open a connection to the provided URL
          // By using the Method gotten
          request.open(method, path);
      
          // Do the request
          request.send();
      });
  }
}