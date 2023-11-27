import http from 'http';
import fs from 'fs';

const sendFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.end('error');
      return;
    }
    res.end(data);
  });
};

const requestHandler = (req, res) => {
  console.log('Request:', req.url, req.method);

  if (req.url === '/') {
    sendFile('./assets/html/index.html', res);
  } else {
    const filePath = './assets/html' + req.url;
    sendFile(filePath, res);
  }
};

const server = http.createServer(requestHandler);
server.listen(9898, () => console.log('server läuft'));
