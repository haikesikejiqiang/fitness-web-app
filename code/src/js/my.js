require("../css/my.less");
require('../lib/swiper/swiper-bundle.css')
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')
let baseUrl = require('../image/avatar.png')


document.ready(function() {
    $untils.isLogin()
    $untils.footerTab('my');
    let head = document.querySelector('.head')
    let gallery = document.querySelector('#gallery')
    let galleryImg = document.querySelector('#galleryImg');

    // 初始用户渲染数据
    $http.get('/users/accountinfo', {
        userId: window.localStorage.userId
    }, function(msg) {
        console.log(msg);
        sessionStorage.setItem("userId", window.localStorage.userId);
        sessionStorage.setItem("nickname", msg.data.nickname);
        sessionStorage.setItem("gender", msg.data.gender);
        sessionStorage.setItem("birthday", msg.data.birthday);
        sessionStorage.setItem("imgurl", msg.data.imgurl);
        sessionStorage.setItem("address", msg.data.address);
        sessionStorage.setItem("describe", msg.data.sign);

        document.querySelector("#account").textContent = msg.data.nickname

        console.log(1);
        if (msg.data.imgurl === null || msg.data.imgurl === 'null') {
            head.style.backgroundImage = `url(${baseUrl.default})`
        } else {
            console.log(2);
            head.style.backgroundImage = `url('http://139.9.177.51:8099/${window.sessionStorage.getItem("imgurl")}')`
        }




        if (msg.data.sign === null) {
            document.querySelector('#describe').textContent = '这个人很帅咩'
        } else {
            document.querySelector('#describe').textContent = msg.data.sign
        }
    })



    // 点击预览
    head.addEventListener('click', function() {
        console.log(head.style, head.getAttribute('style'));
        galleryImg.setAttribute('style', head.getAttribute('style'))
        window.$untils.fadeIn(gallery, 30)

    })


    // 点击关闭预览
    gallery.addEventListener('click', function() {

        window.$untils.fadeOut(gallery, 30)

    })


    // 点击修改资料
    document.querySelector('#userNext').addEventListener('click', function() {
        location.href = './per.html'
    })


    // 获取我的勋章的数据
    $http.get('/users/mysportsBadge', {
        userId: window.localStorage.userId
    }, function(msg) {
        document.querySelector("#dynamicCount").textContent = msg.data.dynamicCount + '条'
        document.querySelector('#times').textContent = Math.ceil(msg.data.sports.times / 60)
        document.querySelector('#calorie').textContent = parseInt(msg.data.sports.calorie)
    })


    // 退出登录
    document.querySelector('.exit').addEventListener('click', function() {
        localStorage.removeItem('userId');
        location.href = './login.html'
    })


    document.querySelector('#sportD').onclick = function() {
        window.location.href = './sportD.html'
    }
})