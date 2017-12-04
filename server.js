const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get('/video/:id', (request, response) => {
  var Vimeo = require('vimeo').Vimeo;
  var api = new Vimeo(null, null, process.env.VIMEO_TOKEN);

  api.request({
    method: 'GET',
    path: '/videos/' + request.params.id,
  }, function(error, body, status_code, headers) {
    if (error) {
      response.status(500).send(error);
    }
    else {
      if (body["files"] == null) {
        response.status(401).send({ error: "You don't have access to this video's files."});
        return;
      }

      // Prep the files to include the correct type and exclude uncessary files
      if (body["files"] != null) {
        body["files"] = body["files"].map(function(file, i) {
          if (file['quality'] == 'hls') {
            file['type'] = 'application/x-mpegurl';
          }
          if (file['quality'] == 'source') {
            return;
          }

          return file;
        }).sort(function(a, b) {
          if (a['quality' == 'hls']) return -1;
          return 1;
        });
      }

      response.status(200).send(body);
    }
  });

});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}. 🚢`);
});
