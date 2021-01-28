require("../css/player.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')


document.ready(function() {
    // window.$untils.editLogin()

    let videoList = JSON.parse(sessionStorage.getItem("obj"))

    let index = 0
    let timeArr = new Array(videoList.length)

    getVideo()

    function getVideo() {
        document.querySelector('video').src = 'http://139.9.177.51:8099' + videoList[index].videoUrl
        document.querySelector('#length').textContent = videoList.length;
        document.querySelector('#dec').textContent = videoList[index].title;
        document.querySelector('#current').textContent = index + 1
        document.querySelector('.maskimg img').src = 'http://139.9.177.51:8099' + videoList[index].imgUrl
        document.querySelector('.img h5').textContent = videoList[index].title;
    }



    function setProgress() {
        let currentTime = document.querySelector('video').currentTime;
        let duration = document.querySelector('video').duration;
        let totalW = document.body.offsetWidth;
        document.querySelector('.progress').style.width = totalW * currentTime / duration + 'px'
        timeArr[index] = currentTime;
    }

    let timer = setInterval(setProgress, 10)

    document.querySelector('#next').addEventListener('click', function a() {
        index = index + 1

        if (index === videoList.length) {
            index = 0
        }
        getVideo(index)

    })



    document.querySelector('.up').addEventListener('click', function() {
        index = index - 1
        if (index === -1) {
            index = videoList.length - 1
        }
        getVideo(index)
    })

    document.querySelector('.pause').addEventListener('click', function() {
        document.querySelector('video').pause();
        document.querySelector('.mask').style.display = 'block'
        clearInterval(timer)

    })

    document.querySelector('.continue').addEventListener('click', function() {
        document.querySelector('.mask').style.display = 'none'
        document.querySelector('video').play();
        setProgress()
        timer = setInterval(setProgress, 50)
    })

    document.querySelector('video').addEventListener('ended', function() {
        document.querySelector('#next').click();
    })


    document.querySelector('.end').addEventListener('click', function() {
        let sum = 0;
        timeArr.forEach(val => {
            sum = sum + val
        });
        let obj = {
            id: sessionStorage.getItem('cid') - 0,
            userId: sessionStorage.getItem('userId'),
            takeTime: sum,
            calorie: sum * 1.3
        }
        $http.post('/sports/saveTrain', obj, function(msg) {
            window.location.href = './courseD.html'
        })
    })

})