require("../css/login.less");
require('../lib/weui/weui.css')
let submit = document.querySelector('#submit')
let tel = document.querySelector('#tel')
let psd = document.querySelector('#psd')
let toast = document.querySelector('#toast')
submit.addEventListener('click', function() {
    if (!tel.value) {
        $untils.weTip('请填写账号')
        return false
    } else if (!/^1[2-9][\d]{9}$/.test(tel.value)) {
        $untils.weTip('没有此账号')
        return false
    } else {

        $http.post('/users/login', {
            account: tel.value,
            password: psd.value
        }, function(msg) {
            console.log(msg);
            if (msg.status === 5001) {
                $untils.weTip('请填写完整')
                return false
            } else if (msg.status === 555) {
                $untils.weTip('用户名或密码错误')
                return false
            } else if (msg.status === 0) {
                if (toast.style.display != 'none') return
                window.$untils.fadeIn(toast, 10)
                setTimeout(function() {
                    window.$untils.fadeOut(toast, 30)
                    localStorage.setItem("userId", msg.data.user.userId);
                    location.href = './home.html'
                    return false
                }, 800);

            } else {
                $untils.weTip('未知错误')
                return false
            }
        })
    }
});