const http = require("http");
const fs = require("fs");
const info = require("./info.js");
const app = http.createServer((request, response) => {
  const _url = request.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const pathName = fullUrl.pathname;
  const queryData = fullUrl.searchParams;

  if (pathName === "/") {
    let list = "";
    if (queryData.get("id") === null) {
      title = `<h1>코드짜는 문과녀</h1>`;
      description = `<p>코드짜는 문과녀의 블로그입니다.</p>`;
    } else {
      /* localhost:3000/?id=NodeJs 일때,
        queryData.get("id") = NodeJs
      */
      title = queryData.get("id");
      description = fs.readFileSync(`./data/${title}`, "utf8"); 
    }

    fs.readdir("./data", (err, files) => {
      files.forEach((file) => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
      });
      response.writeHead(200, { "Content-Type": "text/html;charset = utf-8" });
      response.end(info(title, description, list));
    });
  }
});

app.listen(3000, () => {
  //포트번호 3000으로 서버 구동
  console.log("서버 시작 주소: http:localhost:3000");
});
