import http from 'http';
import fs from 'fs';

const sendFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.end('error');
      return;
    }
    if (path.includes('.png')) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
    }
    if (path.includes('.ttf')) {
      res.writeHead(200, { 'Content-Type': 'font.ttf' });
    }

    res.end(data);
  });
};

const requestHandler = (req, res) => {
  console.log('Request:', req.url, req.method);

  if (req.url === '/') {
    sendFile('./assets/html/index.html', res);
  } else if (req.url === '/style/style.css') {
    //$ der pfad der css datei muss relativ zur html datei sein, in der sie verlinkt ist!
    sendFile('./assets/style/style.css', res);
  } else if (req.url.includes('/img')) {
    const filePath = './assets' + req.url;
    sendFile(filePath, res);
  } else if (req.url.includes('/font')) {
    const filePath = './assets' + req.url;
    sendFile(filePath, res);
  } else {
    const filePath = './assets/html' + req.url;
    sendFile(filePath, res);
  }
};

const server = http.createServer(requestHandler);
server.listen(9898, () => console.log('server läuft'));
