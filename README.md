## yu.compress 前端图片压缩模块


#### 安装
npm install --save yu.compress

#### 使用方法
```javascript
var comporess = require('yu.compress')

input.addEventListener('change', function (e) {
    file = e.target.files[0];
    before.innerHTML = "压缩前："+file.name+"，"+file.size+"b"
    compress(file, {
        success: function (data) {
            after.innerHTML = "压缩后："+data.name+"，"+data.size+"b"
        }
    })
})
```

#### 参数
```javascript
var DEFAULT_OPTIONS = {
    filter: undefined, // 单位b，压缩大于此值的图片，默认压缩全部
    quality: 0.5, // 压缩质量 0 - 1
    name: undefined, // 文件名称
    width: undefined, // 图片宽度
    height: undefined, // 图片高度
    type: 'image/jpeg', // 图片类型
    success: NOOP, // 压缩成功后的回调
    error: NOOP, // 压缩失败后的回调
    base64: false // 默认返回blob格式图片，是否返回base64格式图片
}
```
