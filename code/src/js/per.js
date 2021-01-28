require("../css/per.less");
require('../lib/swiper/swiper-bundle.css')
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')
let baseUrl = require('../image/avatar.png')



// // 检测是否登录
// $untils.editLogin();


// 后退返回功能
document.querySelector('#back').addEventListener('click', function() {
    window.location.href = './my.html';
});




document.querySelector('.username input').value = window.sessionStorage.getItem("nickname");
if (window.sessionStorage.getItem("gender") === 'null') {
    document.querySelector('#sex .replace span').textContent = '男'
} else {
    document.querySelector('#sex .replace span').textContent = window.sessionStorage.getItem("gender")
}
if (window.sessionStorage.getItem("birthday") === 'null') {
    let date = new Date()
    document.querySelector('#date').textContent = [date.getFullYear(), window.$untils.padZero(date.getMonth() + 1), window.$untils.padZero(date.getDate())].join('-');
} else {
    document.querySelector('#date').textContent = window.sessionStorage.getItem("birthday").substring(0, window.sessionStorage.getItem("birthday").indexOf('T'))
}

if (window.sessionStorage.getItem("imgurl") === 'null') {
    show.style.backgroundImage = `url(${baseUrl.default})`
} else {
    show.style.backgroundImage = `url('http://139.9.177.51:8099/${window.sessionStorage.getItem("imgurl")}')`
}
if (window.sessionStorage.getItem("address") === 'null') {
    document.querySelector('#city .replace').textContent = '湖北省武汉市'
} else {
    document.querySelector('#city .replace').textContent = window.sessionStorage.getItem("address")
}
if (window.sessionStorage.getItem("describe") === 'null') {
    document.querySelector('.moer').value = '这个人很帅咩'
    document.querySelector('.weui-textarea-counter span').textContent = document.querySelector('.weui-textarea').value.length

} else {
    document.querySelector('.moer').value = window.sessionStorage.getItem("describe")
    document.querySelector('.weui-textarea-counter span').textContent = document.querySelector('.weui-textarea').value.length
}

// 上传图片
let $uploaderInput = document.querySelector('#uploaderInput')
let $show = document.querySelector('#show')
$uploaderInput.addEventListener('change', function(e) {
    let src, url = window.URL || window.webkitURL || window.mozURL;
    let files = e.target.files;
    for (let i = 0, len = files.length; i < len; ++i) {
        let file = files[i];
        if (url) {
            src = url.createObjectURL(file);
        } else {
            src = e.target.result;
        }
    }
    $show.style.backgroundImage = `url(${src})`;
    // 上传文件服务器
    window.$untils.upload(files[0])
})




document.querySelector('#sex').addEventListener("click", function() {
    weui.picker([{
        label: '男',
        value: 0
    }, {
        label: '女',
        value: 1
    }], {
        onConfirm: function(result) {
            document.querySelector('#sex .replace span').textContent = result[0].label

        },
        title: '区号选择'
    });
})

document.querySelector('#birthday').addEventListener("click", function() {
    weui.datePicker({
        start: new Date().getFullYear() - 120,
        end: new Date().getFullYear(),
        onConfirm: function(result) {
            document.querySelector('#date').textContent = [result[0].value, window.$untils.padZero(result[1].value), window.$untils.padZero(result[2].value)].join('-')
        },
        title: '生日'
    });
})


//所有省份的数组



$http.get('/address/province', {}, function(msg) {
    let data = msg.data;
    data = data.filter(function(item) {
        return item.name !== '中国'
    })
    let proList = data.map(function(item) {
        return {
            label: item.name,
            value: item.addressId,
        }
    })
    proList.forEach((val) => {
        $http.get('/address/city/' + val.value, {}, function(msg) {
            let data = msg.data;
            let cityList = data.map(function(item) {
                return {
                    label: item.name,
                    value: item.addressId,
                }
            })
            val.children = cityList
        })
    });
    document.querySelector('#city').addEventListener("click", function() {
        weui.picker(proList, {
            // className: 'custom-classname',
            // container: 'body',
            // onChange: function(result) {},
            onConfirm: function(result) {
                document.querySelector('#city .replace').textContent = result[0].label + result[1].label

            },
            id: 'doubleLinePicker',
        });
    })
});




document.querySelector('.save').addEventListener('click', function() {
    $http.post('/users/userEdit', {
        userId: window.localStorage.userId,
        nickname: document.querySelector('.username input').value,
        gender: document.querySelector('#sex .replace span').textContent,
        imgurl: window.sessionStorage.getItem("imgurl"),
        birthday: document.querySelector('#date').textContent,
        sign: document.querySelector('.moer').value,
        address: document.querySelector('#city .replace').textContent.split()

    }, function(msg) {
        console.log(msg);
    })
})

document.querySelector('.weui-textarea').addEventListener('input', function() {
    document.querySelector('.weui-textarea-counter span').textContent = this.value.length
})