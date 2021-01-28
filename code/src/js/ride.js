require("../css/ride.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')


document.ready(function() {
    $untils.isLogin()
    $untils.sportTab('ride')
    $untils.footerTab('run')


    $http.get('/sports/exerciseData', {
        id: window.localStorage.getItem('userId') - 0
    }, function(msg) {
        document.querySelector('#ridekm').textContent = msg.data.ridekm
    })


    let downArr = [3, 2, 1, 'GO']
    let down = null;
    let runTimeEl = document.querySelector("#runTime");
    let nextTime = document.querySelector("#nextTime");
    let endTime = document.querySelector("#endTime");
    let runTime = 0;



    // 点击Go的事情
    document.querySelector('.go').addEventListener('click', function() {
        let index = -1
        document.querySelector('.mask').style.display = 'block'
        cutDown()
        down = setInterval(cutDown, 1000)

        function cutDown() {
            index = index + 1
            document.querySelector('.down').textContent = downArr[index]
            if (index === 4) {
                clearInterval(down)
                document.querySelector('.sport_mask').style.display = 'block'
                startRun()
            }
        }

    })



    function startRun() {
        down = setInterval(function() {
            getMap()
            runTime++;
            runTimeEl.textContent = window.$untils.getTimeBySec(runTime)
            nextTime.textContent = window.$untils.getTimeBySec(runTime)
            endTime.textContent = window.$untils.getTimeBySec(runTime)
            document.querySelector('.date span').textContent = window.$untils.getDate()


        }, 1000);
    }


    document.querySelector('.danr').addEventListener('click', function() {
        document.querySelector('.sport_end').style.display = 'block'
            // let endGps = document.querySelector('#gps').cloneNode(true)
            // console.log(endGps);
            // document.querySelector('#endGps').appendChild(endGps)
    })


    document.querySelector('.success').onclick = function() {
        document.querySelector('.mask').style.display = 'none';
        document.querySelector('.sport_mask').style.display = 'none';
        document.querySelector('.sport_end').style.display = 'none';
    }

    document.querySelector('.gps').onclick = function() {
        document.querySelector('.gps_mask').style.display = 'block'
    };
    document.querySelector('.play').addEventListener('click', function() {
        this.style.opacity = '0'
        document.querySelector('.btn').style.zIndex = '1'
        document.querySelector('.btn').style.opacity = '1'
        document.querySelector('.lock').style.opacity = '0'
        clearInterval(down)
    })

    document.querySelector('.minbtn').addEventListener('click', function() {
        document.querySelector('.play').style.opacity = '1'
        document.querySelector('.lock').style.opacity = '1'
        document.querySelector('.btn').style.zIndex = '-1'
        document.querySelector('.btn').style.opacity = '0'
        startRun()
    })

    document.querySelector('#top').addEventListener('click', function() {
        document.querySelector('.gps_mask').style.display = 'none'
    })

    // 地图
    bdMap()

    function bdMap() {
        var map = new BMap.Map("map");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let lat = r.latitude;
                let lng = r.longitude;
                var point = new BMap.Point(lng, lat);
                map.centerAndZoom(point, 12); //中心点
            } else {
                alert('failed' + this.getStatus());
            }
        });

    }




    let add = 0.001

    let map = new BMap.Map("gps");
    let endGps = new BMap.Map("endGps");

    function getMap() {

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let lat = r.latitude * 1 + add;
                let lng = r.longitude * 1 + add;
                add = add + 0.05
                console.log(lng, lat);
                var point = new BMap.Point(lng, lat);
                map.centerAndZoom(point, 12); //中心点
                endGps.centerAndZoom(point, 12);
            } else {
                alert('failed' + this.getStatus());
            }
        });
    }

})