require("../css/courseD.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')



document.ready(function() {
    // window.$untils.editLogin()


    getVideo()

    function getVideo() {
        let video = document.createElement('video')
        video.id = 'video';
        video.autoplay = 'autoplay';
        video.loop = 'loop';
        video.preload = 'preload'
        video.muted = 'true'
        document.querySelector('.play').appendChild(video)

        let play = document.createElement('span')
        play.className = 'iconfont iconicon_play'
        play.id = 'play'
        document.querySelector('.play').appendChild(play)
    }
    document.querySelector('#play').addEventListener('click', function() {
        if (!document.querySelector('#video').paused) {
            document.querySelector('#video').pause()
        } else {
            document.querySelector('#video').play()
        }

    })

    let url = 'http://139.9.177.51:8099';
    $http.get('/sports/courseDetail', {
        id: sessionStorage.getItem('cid')
    }, function(msg) {

        console.log(msg);
        document.querySelector('.title').textContent = msg.data.name
        document.querySelector('video').src = url + msg.data.fragments[0].videoUrl
        document.querySelector('.data_calorie').textContent = msg.data.calorie
        document.querySelector('.data_time').textContent = msg.data.time
        document.querySelector('.peoplenum').textContent = msg.data.peoplenum
        document.querySelector('.desc').textContent = msg.data.desc
        sessionStorage.setItem('obj', JSON.stringify(msg.data.fragments))
        document.querySelectorAll('.name_desc').forEach(val => {
            if (val.clientHeight > 48) {
                let span = document.createElement('span')
                span.innerHTML = '...更多'
                span.className = 'collapse'
                val.classList.add('ellipsis')
                document.querySelector('.name_desc .desc').appendChild(span)
            }
        });
        document.querySelector('.collapse').onclick = function() {

            if (document.querySelector('.name_desc').classList.length === 1) {
                document.querySelector('.name_desc').classList.add('ellipsis')
                document.querySelector('.collapse').textContent = '...更多'
            } else {
                document.querySelector('.name_desc').classList.remove('ellipsis')
                document.querySelector('.collapse').textContent = '...收起'
            }
        }
        document.querySelector('.text_instrument').textContent = msg.data.instrument
        document.querySelector('.text_frequency span').textContent = msg.data.frequency
        document.querySelector('.img').style.backgroundImage = `url(${url + msg.data.fragments[0].imgUrl})`
    })

    document.querySelector('.submit').addEventListener('click', function() {
        console.log(1);
        window.location.href = './player.html'
    })

    document.querySelector('#back').onclick = function() {
        window.location.href = './course.html'
    }


})