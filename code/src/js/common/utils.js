/**
 * 工具函数  公用函数
 */


//补0封装
function padZero(num) {
    return num <= 9 ? "0" + num : num;
}



// 获取时分秒
function getTimeBySec(time) {
    let h = Math.floor(time / 3600 % 24); //小时
    let min = Math.floor(time / 60 % 60); //分
    let sec = Math.floor(time % 60); //秒
    return [padZero(h), padZero(min), padZero(sec)].join(':')
}


// 淡入封装
function fadeIn(element, speed) {
    var speed = speed || 30;
    var num = 0;
    var st = setInterval(function() {
        num++;
        element.style.display = 'block'
        element.style.opacity = num / 10;
        if (num >= 10) { clearInterval(st); }
    }, speed);
}

// 淡出封装
function fadeOut(element, speed) {
    var speed = speed || 30;
    var num = 10;
    var st = setInterval(function() {
        num--;
        element.style.display = 'none'
        element.style.opacity = num / 10;
        console.log(element.style.opacity);
        if (num <= 0) { clearInterval(st); }
    }, speed);
}


// 提示框封装
function weTip(val) {
    weui.topTips(val, {
        duration: 1000,
        className: "custom-classname tip",
        callback: function callback() {
            console.log('close');
        }
    });
}

// 是否登录封装
function isLogin() {
    let isId = localStorage.getItem('userId')
    if (!isId) {
        alert('请先登录')
        location.href = './login.html'
        return false
    }
    return isId
}

function editLogin() {
    let editId = sessionStorage.getItem('userId')
    if (!editId) {
        alert('请先登录')
        location.href = './login.html'
        return false
    }
    return editId
}


// 页脚

function footerTab(info) {
    let footer = document.createElement('footer')
    footer.innerHTML = `
<a href="./home.html" class='${info == 'home' ? 'active' : ''}'>
    <span class="iconfont iconhome"></span>
    <span class="title">首页</span>
</a>
<a href="./run.html"  class='${info == 'run' ? 'active' : ''}' >
    <span class="iconfont iconsports"></span>
    <span class="title">运动</span>
</a>
<a href="javascript:;">
    <span class="iconfont iconcircle"></span>
    <span class="title">圈子</span>
</a>
<a href="./my.html" class='${info == 'my' ? 'active' : ''}'>
    <span class="iconfont iconmine"></span>
    <span class="title">我的</span>
</a>`

    document.body.appendChild(footer)
}


// 头部导航栏追加
function sportTab(info) {
    let header = document.createElement('header');
    header.className = 'sport_head';
    header.innerHTML = ` <a href="./run.html" class='${info == 'run' ? 'active' : ''}'>跑步</a>
    <a href="./ride.html" class='${info == 'ride' ? 'active' : ''}'>骑行</a>
    <a href="./course.html" class='${info == 'course' ? 'active' : ''}'>课程训练</a>`
    document.body.insertBefore(header, document.querySelector('main'))
}




// 上传文件封装
function upload(obj) {
    const url = 'http://139.9.177.51:8099/users/upload';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append('imgurl', obj);
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            sessionStorage.setItem("imgurl", JSON.parse(xhr.responseText).data);
            console.log('响应成功！', JSON.parse(xhr.responseText));
        }
    }
    xhr.send(fd);

}



//获取日期函数
function getDate(sep = "/") {
    let data = new Date();
    let y = data.getFullYear();
    let m = data.getMonth() + 1;
    let d = data.getDate();
    return [y, padZero(m), padZero(d)].join(sep);
}


/* 
  根据经纬度计算距离
    startPoint:  起点 
    curPoint:  终点
*/
function calcDistance(startPoint, curPoint) {
    let lat1 = startPoint.lat
    let lng1 = startPoint.lng

    let lat2 = curPoint.lat
    let lng2 = curPoint.lng

    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s.toFixed(2) // 单位千米
}

/* 计算配速函数 
  d： 距离
  s： 时间
*/
function calcPace(d, s) {
    let distance = d
    let spendTime = s / 60

    console.log(distance, spendTime);
    if (distance > 0 && spendTime > 0) {
        let pace = parseFloat(spendTime / distance)
        let m = Math.floor(pace)
        let s = ((pace - m) * 60).toFixed(0)
        console.log(pace, m, s);
        return `${m}'${s}"`
    }
    return "--"
}
/* 计算卡路里 */
function calCalorie(miles) {
    if (miles > 0) {
        let calorie = 60 * miles * 1.036;
        return calorie.toFixed(2)
    }
    return "--"
}



// 调用
window.$untils = {
    padZero: padZero,
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    weTip: weTip,
    isLogin: isLogin,
    footerTab: footerTab,
    upload: upload,
    editLogin: editLogin,
    sportTab: sportTab,
    getTimeBySec: getTimeBySec,
    getDate: getDate,
    calcDistance: calcDistance,
    calCalorie: calCalorie,
    calcPace: calcPace
}