import http from 'http';
import fs from 'fs';

const sendFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.end('error');
      return;
    }
    // if (path.includes('.css')) {
    //   res.writeHead(200, { 'Content-Type': 'text/css' });
    // }

    res.end(data);
  });
};

const requestHandler = (req, res) => {
  console.log('Request:', req.url, req.method);

  if (req.url === '/') {
    sendFile('./assets/html/index.html', res);
  } else if (req.url === '/css/style.css') {
    //$ der pfad der css datei muss relativ zur html datei sein, in der sie verlinkt ist!
    sendFile('./assets/css/style.css', res);
  } else {
    const filePath = './assets/html' + req.url;
    sendFile(filePath, res);
  }
};

const server = http.createServer(requestHandler);
server.listen(9898, () => console.log('server läuft'));
