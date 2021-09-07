const http = require("http");
const fs = require("fs");
const app = http.createServer((request, response) => {
  const _url = request.url;
  const fullUrl = new URL("http://localhost:3000" + _url);
  const pathName = fullUrl.pathname;

  if (pathName === "/") {
    fs.readdir("./data", (err, files) => {
      console.log(files);
    });
  }
});

app.listen(3000, () => {
  //포트번호 3000으로 서버 구동
  console.log("서버 시작 주소: http:localhost:3000");
});
