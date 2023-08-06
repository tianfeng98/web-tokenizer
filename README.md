# Web Tokenizer

基于[jieba.js](https://github.com/HerrCai0907/jieba.js)实现的web中文分词器

# 📦 Install

```shell
pnpm add web-tokenizer
```

# 🔨 Usage

## ES6

```javascript
import Tokenizer from 'web-tokenizer';

let loading = true;

new Tokenizer({
    onInit(instance) {
        loading = true
        instance.extract("自然语言处理( Natural Language Processing, NLP)是计算机科学领域与人工智能领域中的一个重要方向。它研究能实现人与计算机之间用自然语言进行有效通信的各种理论和方法。自然语言处理是一门融语言学、计算机科学、数学于一体的科学。因此，这一领域的研究将涉及自然语言，即人们日常使用的语言，所以它与语言学的研究有着密切的联系，但又有重要的区别。自然语言处理并不是一般地研究自然语言，而在于研制能有效地实现自然语言通信的计算机系统，特别是其中的软件系统。因而它是计算机科学的一部分。自然语言处理主要应用于机器翻译、舆情监测、自动摘要、观点提取、文本分类、问题回答、文本语义对比、语音识别、中文OCR等方面。").then((res) => {
            console.log(res);
        });
    },
});
```

### 从指定地址获取worker线程

默认的workers地址从unpkg获取，可以配置[workersPath](#workersPath)指定workers的地址。

拷贝`node_modules/web-tokenizer/dist/workers`目录到静态服务器，再将`workersPath`设置为该服务器地址。

例如，在一个vite工程中，将上述的workers目录拷贝的public目录下，配置`workersPath: '/workers'`：

```javascript
new Tokenizer({
    workersPath: '/workers',
    onInit(instance) {
      instance.extract("自然语言处理( Natural Language Processing, NLP)是计算机科学领域与人工智能领域中的一个重要方向。它研究能实现人与计算机之间用自然语言进行有效通信的各种理论和方法。自然语言处理是一门融语言学、计算机科学、数学于一体的科学。因此，这一领域的研究将涉及自然语言，即人们日常使用的语言，所以它与语言学的研究有着密切的联系，但又有重要的区别。自然语言处理并不是一般地研究自然语言，而在于研制能有效地实现自然语言通信的计算机系统，特别是其中的软件系统。因而它是计算机科学的一部分。自然语言处理主要应用于机器翻译、舆情监测、自动摘要、观点提取、文本分类、问题回答、文本语义对比、语音识别、中文OCR等方面。").then((res) => {
        console.log(res);
      });
    },
});
```

## Browser

```html
<script src="https://unpkg.com/web-tokenizer@latest/dist/web-tokenizer.iife.js"></script>
```

# Options

## workersPath

`type: string`

worker线程的地址。参见[从指定地址获取worker线程](#从指定地址获取worker线程)。

## workerType

`type: "specific" | "share"`

使用专用Worker或者共享Worker，默认使用专用Worker(specific)。

## onInit

`type: (instance: Tokenizer) => void;`

初始化完成时的回调。Workers需要一些时间初始化`jieba.js`，初始化完成后才能使用分词功能。

# Instance

Tokenizer实例提供`extract`和`cut`两个异步分词方法，返回内容的区别参见[jieba.js#result](https://github.com/HerrCai0907/jieba.js#result)
