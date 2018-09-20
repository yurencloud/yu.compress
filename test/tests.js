var compress = require('../src/index')
var expect = require('chai').expect;

var input = document.getElementById("fileInput")


input.addEventListener('change', function (e) {
    file = e.target.files[0];
    console.log(file);
    compress(file, {
        success: function (data) {
            describe('测试图片压缩', function () {
                it('压缩图片成功', function () {
                    console.log(data)
                    expect(data.size).to.be.below(file.size);
                })
            })
        }
    })
})
