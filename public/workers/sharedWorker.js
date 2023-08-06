import exec from "./jieba/index.js";

onconnect = function (event) {
  const port = event.ports[0];
  exec(port);
};
