var compress = require('../src/index')
var expect = require('chai').expect;

var input = document.getElementById("fileInput1")
var input2 = document.getElementById("fileInput2")
var before = document.getElementById("before")
var after = document.getElementById("after")

input.addEventListener('change', function (e) {
    file = e.target.files[0];
    before.innerHTML = "压缩前："+file.name+"，"+file.size+"b"
    compress(file, {
        success: function (data) {
            after.innerHTML = "压缩后："+data.name+"，"+data.size+"b"
        }
    })
})

input2.addEventListener('change', function (e) {
    file = e.target.files[0];
    before.innerHTML = "压缩前："+file.name+"，"+file.size+"b"
    compress(file, {
        success: function (data) {
            after.innerHTML = "压缩后："+data.name+"，"+data.size+"b"
        },
        filter: 1000,
        quality: 0.8,
        name: '新文件.jpg',
    })
})
