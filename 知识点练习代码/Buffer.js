// Buffer.alloc(size, fill, encoding)
// 内容大小, 填充内容, 编码格式(默认utf8)
// href: https://www.runoob.com/nodejs/nodejs-buffer.html
const buffer = Buffer.alloc(5)  // 5 字节

buffer.write("hello!")
buffer.write("hello!") // 如果超出了定义的时候设定的大小，就不会被写入
console.log(buffer.toString())


// Buffer.from(string, encoding)   直接把一个字符串转换成一个 buffer
// buffer 是一个 类数组的 对象，所以大部分 数组的属性方法也能用
const buffer1 = Buffer.from("hello")
console.log(buffer.length);

