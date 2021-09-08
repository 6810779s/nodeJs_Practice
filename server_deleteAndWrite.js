let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let app = http.createServer((req, res) => {
  let _url = req.url;
  let fullUrl = new URL("http://localhost:3000" + _url);
  let pathName = fullUrl.pathname;
  let queryData = fullUrl.searchParams;

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
        <form action="/write_file" method="post">
          <p>
            <input autocomplete="off" type="text" name="title" placeholder="타이틀" value="" required>
          </p>
          <p>
            <textarea autocomplete="off" type="text" name="description" placeholder="설명" value="" required></textarea>
          </p>
          <p><input type="submit"></p>
        </form>
        <hr>
        <ul>
          ${list}
        </ul>
      </body>
      </html>`);
    });
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
  console.log("server 3000포트에서 시작");
});
