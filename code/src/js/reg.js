require("../css/reg.less");
require('../lib/weui/weui.css')
document.ready(function() {
    let captcha1 = new CaptchaMini();
    let showPhone = document.querySelector('#showPhone')
    let label = document.querySelector('#label')
    let tel = document.querySelector('#tel')
    let psd = document.querySelector('#psd')
    let agin = document.querySelector('#agin')
    let icon = document.querySelector('.icon')
    let yzm = document.querySelector('#yzm')
    let toast = document.querySelector('#toast')
    captcha1.draw(document.querySelector('#captcha1'), r => {
        window.r = r
    });


    icon.onclick = function() {
        history.go(0)
    }

    showPhone.onclick = function() {
        weui.picker([{
            label: '+86',
            value: 0
        }, {
            label: '+80',
            value: 1
        }, {
            label: '+84',
            value: 2
        }, {
            label: '+87',
            value: 3
        }], {
            onConfirm: function(result) {
                label.textContent = result[0].label

            },
            title: '区号选择'
        });
    };
    reg.addEventListener('click', function() {
        if (!tel.value || !psd.value || !agin.value || !yzm.value) {
            $untils.weTip('请填完整')
            return false
        } else if (!/^1[2-9][\d]{9}$/.test(tel.value) || !/^\w{6,12}$/.test(psd.value)) {
            $untils.weTip('请正确填写手机号或者密码')
            return false
        } else if (window.r !== yzm.value) {
            $untils.weTip('验证码填写错误');
            document.querySelector('#captcha1').click()
            console.log(window.r);
            return false
        } else if (psd.value !== agin.value) {
            $untils.weTip('请再次确认你的密码')
            return false
        } else {
            $http.post('/users/add', {
                account: tel.value,
                password: psd.value
            }, function(msg) {
                if (msg.status === 1) {
                    $untils.weTip('用户已存在')
                    document.querySelector('#captcha1').click()
                    return false
                } else if (msg.status === 0) {
                    if (toast.style.display != 'none') return
                    window.$untils.fadeIn(toast, 30)
                    setTimeout(function() {
                        window.$untils.fadeOut(toast, 30)
                        $http.post("/users/login", {
                            account: tel.value,
                            password: psd.value
                        }, function(res) {
                            if (res.status === 0) {
                                localStorage.setItem("userId", res.data.user.userId);
                                location.href = "./home.html";
                            } else {
                                $untils.weTip('登录失败')
                                return false
                            }
                        })
                    }, 800);

                } else {
                    $untils.weTip('注册失败')
                    return false
                }

            })
        }

    });
})