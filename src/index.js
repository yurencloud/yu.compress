var object = require('yu.object')

var NOOP = function () {
}

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

function compress(file, options) {
    options = options || {}
    options = object.assign(DEFAULT_OPTIONS, options)
    var success = options.success
    var error = options.error

    // 默认压缩所有图片，如果设置了filter，则过滤filter size以下的图片
    if (options.filter && file.size < options.filter) {
        return success(file)
    }

    const name = options.name || file.name
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        const src = e.target.result
        const img = new Image()
        img.src = src
        img.onload = (e) => {
            const w = options.width || img.width
            const h = options.height || img.height
            const quality = options.quality
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const anw = document.createAttribute("width")
            anw.nodeValue = w
            const anh = document.createAttribute("height")
            anh.nodeValue = h
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = "#fff"
            ctx.fillRect(0, 0, w, h)
            ctx.drawImage(img, 0, 0, w, h)
            const base64 = canvas.toDataURL(options.type, quality)
            if (options.base64) {
                return success(base64)
            }

            // base64转blob的值
            // 去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1])
            const ab = new ArrayBuffer(bytes.length)
            const ia = new Uint8Array(ab)
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i)
            }
            file = new Blob([ab], {type: options.type})
            file.name = name
            success(file)
        }
        img.onerror = (e) => {
            error(e)
        }
    }
    reader.onerror = (e) => {
        error(e)
    }
}


module.exports = compress
