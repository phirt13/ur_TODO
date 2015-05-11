var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + "/public"));

app.get("/secret", function(request, response) {
  response.send('Well done.  Tell nobody!');
});

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/public/todo.html');
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
