import { cut, extract, init, ready } from "./jieba.js";

let isInit = false;

const jiebaInit = () =>
  new Promise((resolve) => {
    ready().then(() => {
      init();
      resolve();
    });
  });

const exec = (_ = self) => {
  const postStatus = (finish) => {
    const status = finish ? "finish" : "pending";
    _.postMessage({
      type: "status",
      data: status,
    });
  };

  /**
   * 此处可在家其他模型
   */
  Promise.all([jiebaInit()]).then(() => {
    postStatus(true);
  });

  _.onmessage = (e) => {
    const { type, data } = e.data;
    switch (type) {
      case "status":
        postStatus(isInit);
        break;
      case "extract":
        _.postMessage({
          type: "extract",
          data: extract(data, 10),
        });
        break;
      case "cut":
        _.postMessage({
          type: "cut",
          data: cut(data, 10),
        });
        break;
    }
  };
};

export default exec;
