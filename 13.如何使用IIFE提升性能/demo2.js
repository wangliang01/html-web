// 写一个请求方法request, 可以在浏览器执行，也可以在node环境中执行
function request() {
  if (typeof window === "undefined") {
    // node环境
    return function (options) {
      const http = require("http");
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        });
        req.on("error", (err) => {
          reject(err);
        });
        req.end();
      });
    };
  } else {
    // 浏览器环境
    return function (options) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url = options.url;
        let method = options.method;
        let data = options.data;
        xhr.open(method, url);
        xhr.send(data);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.status);
            }
          }
        };
      });
    };
  }
}

var request = (function () {
  if (typeof window === "undefined") {
    // node环境
    return function (options) {
      const http = require("http");
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        });
        req.on("error", (err) => {
          reject(err);
        });
        req.end();
      });
    };
  } else {
    // 浏览器环境
    return function (options) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url = options.url;
        let method = options.method;
        let data = options.data;
        xhr.open(method, url);
        xhr.send(data);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.status);
            }
          }
        };
      });
    };
  }
})();
