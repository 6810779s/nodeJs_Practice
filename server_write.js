const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const app = http.createServer((req, res) => {
  const _url = req.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const pathName = fullUrl.pathname;

  if (pathName === "/") {
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
      <form action="/write_file" method="post">
      <p>
        <input autocomplete="off" type="text" name="title" placeholder="타이틀" value="" required>
      </p>
      <p>
        <textarea autocomplete="off" type="text" name="description" placeholder="설명" value="" required></textarea>
      </p>
      <p><input type="submit"></p>
      </form>
    </body>
    </html>`);
  } else if (pathName === "/write_file") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      fs.writeFile(`data/${title}`, `<p>${description}<p>`, "utf8", (err) => {
        res.writeHead(302, { Location: `/` });
        res.end();
      });
    });
  }
});

app.listen(3000, () => {
  console.log("3000포트 서버 시작");
});
