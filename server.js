const http = require("http");
const fs = require("fs");
const app = http.createServer((request, response) => {
  const _url = request.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const pathName = fullUrl.pathname;

  if (pathName === "/") {
    let list = "";
    fs.readdir("./data", (err, files) => {
      files.forEach((file) => {
        list += `<li>${file}</li>`;
        console.log(file);
      });
      console.log("list:", list);
      response.writeHead(200, { "Content-Type": "text/html;charset = utf-8" });
      response.end(`<ul>${list}</ul>`);
    });
  }
});

app.listen(3000, () => {
  //포트번호 3000으로 서버 구동
  console.log("서버 시작 주소: http:localhost:3000");
});
