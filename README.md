# Preload

## 介绍

原生 JavaScript 实现的预加载库，兼容到 IE7+。

效果演示：[https://mqyqingfeng.github.io/Preload/](https://mqyqingfeng.github.io/Preload/)

## 兼容性

IE7+ 

## 依赖

原生 JavaScript 实现，无依赖。

## 大小

压缩后 2KB，gzip 压缩后更小。

## 下载

```js
git clone git@github.com:mqyqingfeng/Preload.git
```

## 使用

```html
<script src="path/preload.js"></script>
```

或者

```js
import Preload from 'path/preload.js'
```

## 示例

```js

var pics = [
    "https://mqyqingfeng.github.io/demo/img/yayu.jpeg",
    ...
]

new Preload(pics, {
    progress: function(index, total, type){
        var percent = Math.floor(index / total * 100) + '%';
        console.log(percent);
    },
    complete: function(sucessNum, failNum){
        console.log('成功加载' + sucessNum + '张图片，加载失败' + failNum + '张图片');
    }
});
```

## API

### 初始化

```js
new Preload(options);
```

### options

**1.progress**

当加载完一张图片时就会触发该函数

```js
new Preload(pics, {
    // 函数有 3 个参数
    // index 表示加载到第几张图片
    // totoal 表示一共需要记载几张图片
    // type 加载的类型，成功还是失败，成功为 'success'，失败为 'fail'
    progress: function(index, total, type){
        var percent = Math.floor(index / total * 100) + '%';
        console.log(percent);
    }
});
```

**2.complete**

当所有图片加载完毕时触发

```js
new Preload(pics, {
    // 函数有 2 个参数
    // sucessNum 表示成功加载的个数
    // failNum 表示加载失败的个数
    complete: function(sucessNum, failNum){
        console.log('成功加载' + sucessNum + '张图片，加载失败' + failNum + '张图片');
    }
});
```