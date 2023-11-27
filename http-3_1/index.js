import http from 'http';
import fs from 'fs';

const sendFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.end('error');
      return;
    }
    // png & ttf wird automatisch erkannt
    res.end(data);
  });
};

const requestHandler = (req, res) => {
  console.log('Request:', req.url, req.method);

  if (req.url === '/') {
    sendFile('./assets/html/index.html', res);
    //
  } else {
    const filePath = './assets' + req.url;
    sendFile(filePath, res);
  }
};

const server = http.createServer(requestHandler);
server.listen(9898, () => console.log('server läuft'));

// wenn ich die pfade für die seiten in der nav relativ von der index.html aus angebe
// zB './about.html' dann ist der pfad für die html datein anders als für die restlichen ordner
// und ich müsste folgende unterscheidung machen:
//
// if (req.url === '/') {
//   sendFile('./assets/html/index.html', res);
//   //
// } else if (
//   req.url.includes('/style') ||
//   req.url.includes('/img') ||
//   req.url.includes('/font')
// ) {
//   const filePath = './assets' + req.url;
//   sendFile(filePath, res);
//   //
// } else {
//   const filePath = './assets/html' + req.url;
//   sendFile(filePath, res);
// }
//
// was sich einfach umgehen lässt wenn ich den pfag für alle datein vom assets ordner ausgehend angebe also
// für die html datein '../html/about.html'
