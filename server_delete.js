const http = require("http");
const fs = require("fs");

let app = http.createServer((req, res) => {
  const _url = req.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const pathName = fullUrl.pathname;
  const queryData = fullUrl.searchParams;
  if (pathName === "/") {
    let list = "";
    if (queryData.get("id") !== null) {
      let fileName = queryData.get("id");
      fs.unlink(`./data/${fileName}`, (err) => {
        res.writeHead(302, { location: `/` });
        res.end();
      });
    }
    fs.readdir(`./data`, (err, files) => {
      files.forEach((file) => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
      });
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>코드짜는 문과녀</title>
      </head>
      <body>
        <ul>
          ${list}
        </ul>
      </body>
      </html>`);
    });
  }
});

app.listen(3000, () => {
  console.log("서버 3000포트에서 시작");
});
