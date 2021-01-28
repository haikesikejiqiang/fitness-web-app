require("../css/home.less");
require('../lib/swiper/swiper-bundle.css')
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')

document.ready(function() {
    $untils.isLogin()

    $http.get('/headPageInfo', {
        userId: window.localStorage.userId
    }, function(msg) {

        document.querySelector('.rank_data').textContent = msg.data.rank
        document.querySelector('.badge_data span').textContent = msg.data.insigniaNum
        document.querySelector('#clock_span').textContent = msg.data.punchIn
        document.querySelector('.clock_data').onclick = function() {
            if (msg.data.isPunch === 'false') {
                $http.get('/clockIn', {
                    userId: window.localStorage.userId
                }, function(msg) {
                    if (msg.status === 0) {
                        $http.get('/headPageInfo', {
                            userId: window.localStorage.userId
                        }, function(msg) {
                            document.querySelector('#clock_span').textContent = msg.data.punchIn
                            if (toast.style.display != 'none') return
                            window.$untils.fadeIn(toast, 1)
                            setTimeout(function() {
                                window.$untils.fadeOut(toast, 30)
                                return false
                            }, 800);
                        })
                    } else if (msg.status === 1) {
                        $untils.weTip('已经打过卡了')
                    }
                })
            } else if (msg.data.isPunch === 'true') {
                $untils.weTip('已经打过卡了')

            }
        }

    })
    new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
            delay: 500,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    $untils.footerTab('home')
})