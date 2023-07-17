const http = require("http");

let server = http
  .createServer((req, res) => {
    console.log( "Request Received" );
  })
  .listen(1234, () => {
    console.log("Your App is Listening on Port 8080");
  });




