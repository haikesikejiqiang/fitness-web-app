require("../css/run.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')

document.ready(function() {
    // 初始调用函数
    $untils.isLogin()
    $untils.footerTab('run')
    $untils.sportTab('run')


    $http.get('/sports/exerciseData', {
        id: window.localStorage.userId - 0
    }, function(msg) {
        document.querySelector('#runkm').textContent = msg.data.runkm
    })

    // Go下面的地图
    getMap('main')


    // 生成地图函数
    function getMap(ele) {
        let map = new BMap.Map(ele);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var point = new BMap.Point(r.point.lng, r.point.lat);
                map.centerAndZoom(point, 12);
            } else {
                alert('failed' + this.getStatus());
            }
        });
    }

    // 动态生成GO
    let go = document.createElement('div')
    go.classList.add('go');
    go.textContent = 'GO'
    console.log(go);
    document.querySelector('#main').appendChild(go);



    // 添加数组通过蒙版内容
    let goArr = [3, 2, 1, 'GO']
    let H2 = document.querySelector('.fall h2')
    let index = 0



    // 动态GO点击事件
    document.querySelector('.go').onclick = function() {
        document.querySelector('.sure').style.display = 'none'
        document.querySelector('.pauseBtn').style.display = 'flex'
        document.querySelector('.lockBtn').style.display = 'flex'
        document.querySelector('.fall').style.display = 'block';
        yesMap()
        theMap()
        H2.textContent = goArr[0]
        let fallId = setInterval(function() {
            index++
            H2.textContent = goArr[index]
            if (index === 4) {
                clearInterval(fallId)
                clearInterval(timeId)
                fallId = null
                timeId = null
                index = 0
                document.querySelector('.fall').style.display = 'none';
                document.querySelector('.sporting').style.display = 'block';
                muchTime()

            }
        }, 1000);
    }

    //开始计算时间
    let timeId = null
    let sec = 0
    let dist = 0;
    let space = 0;
    let calorie = 0;


    function muchTime() {
        clearInterval(timeId)
        document.querySelector('.muchTime').textContent = window.$untils.getTimeBySec(sec)
        timeId = setInterval(function() {
            sec = sec + 1
            document.querySelector('.muchTime').textContent = window.$untils.getTimeBySec(sec)
            document.querySelector('#unavailable').textContent = document.querySelector('.muchTime').textContent
            document.querySelector("#calorie02").textContent = document.querySelector("#calorie").textContent;
            document.querySelector("#space02").textContent = document.querySelector("#space").textContent;
            document.querySelector('.day').textContent = window.$untils.getDate()

            landMap()
            if (positionArr.length > 0) {
                dist = window.$untils.calcDistance(positionArr[0], positionArr[positionArr.length - 1]);
                space = window.$untils.calcPace(dist, sec);
                calorie = window.$untils.calCalorie(dist);
                //渲染
                document.querySelector("#dist").textContent = dist;
                document.querySelector("#calorie").textContent = calorie;
                document.querySelector("#space").textContent = space;
            }

        }, 1000)
    }


    // 点击暂停时间
    document.querySelector('.pauseBtn').onclick = function() {
        clearInterval(timeId)
        timeId = null
        this.style.display = 'none'
        document.querySelector('.lockBtn').style.display = 'none'
        document.querySelector('.sure').style.display = 'flex'
    }

    // 点击继续开始
    document.querySelector('.goon').onclick = function() {
        muchTime()
        document.querySelector('.sure').style.display = 'none'
        document.querySelector('.pauseBtn').style.display = 'flex'
        document.querySelector('.lockBtn').style.display = 'flex'
    }


    // 点击小地图预览
    document.querySelector('.showMap').onclick = function() {



        document.querySelector('.sporting').style.display = 'none';
        document.querySelector('#land').style.display = 'block'
        document.querySelector('.complete').style.display = 'none'
        document.querySelector('.theCard').style.display = 'none'
        document.querySelector('.arrow').style.display = 'block'
        document.querySelector('.mapCard').style.display = 'block'


    }

    // 动态生成小小地图函数
    function yesMap() {
        if (!document.querySelector('.mapCard')) {
            let arrow = document.createElement('div')
            arrow.classList.add('arrow', 'iconfont', 'iconleftarrow')
            let mapCard = document.createElement('div')
            mapCard.classList.add('mapCard')
            mapCard.innerHTML = `<div class="outrun">户外跑</div>
        <div class="render">
            <div class="pace">
                <h4>配速</h4>
                <span id="space02">99'99</span>
            </div>
            <div class="unavailable">
                <h4>用时</h4>
                <span id="unavailable">99:99:99</span>
            </div>
            <div class="distance">
                <h4>距离(km)</h4>
                <span id="calorie02">99.99</span>
            </div>
        </div>`
            document.querySelector('#land').appendChild(arrow)
            document.querySelector('#land').appendChild(mapCard)
        }



        document.querySelector('.arrow').onclick = function() {
            document.querySelector('.sporting').style.display = 'block';
            document.querySelector('#land').style.display = 'none'
        }
    }

    // 动态生成完成地图函数
    function theMap() {

        if (!document.querySelector('.theCard')) {
            let complete = document.createElement('div')
            complete.classList.add('complete')
            complete.innerHTML = '完成'
            let thiCard = document.createElement('div')
            thiCard.classList.add('theCard')
            thiCard.innerHTML = `<div class="doorrun">
            <div class="runKm">
                <h3>户外跑</h3>
                <p><span id="dist01">99.99</span>公里</p>
            </div>
            <div class="day">
                2020/11/10
            </div>
        </div>
        <div class="Kcards">
            <div class="Pace">
                <h3  id="space01">14'51''</h3>
                <span>平均配速</span>
            </div>
            <div class="unavailable">
                <h3 id="use">99:99:99</h3>
                <span>用时</span>
            </div>
            <div class="calories">
                <h3 id="calorie01">3600</h3>
                <span>千卡</span>
            </div>
        </div>`
            document.querySelector('#land').appendChild(complete)
            document.querySelector('#land').appendChild(thiCard)
        }

        document.querySelector('.complete').onclick = function() {
            let params = {
                id: window.localStorage.getItem('userId') - 0,
                type: 1,
                takeTime: sec,
                miles: dist,
                averagerate: dist / sec,
                calorie: calorie
            }
            window.$http.post("/sports/save", params, function(msg) {
                console.log(msg);
                history.go(0)
            })
        }

    }

    // 点击结束按钮
    document.querySelector('.end').onclick = function() {
        clearInterval(timeId)
        timeId = null
        document.querySelector('.sporting').style.display = 'none';
        document.querySelector('#land').style.display = 'block'

        if (document.querySelector('.arrow')) {
            document.querySelector('.arrow').style.display = 'none'
            document.querySelector('.mapCard').style.display = 'none'
        }
        document.querySelector('.complete').style.display = 'block'
        document.querySelector('.theCard').style.display = 'block'


        document.querySelector('#use').textContent = document.querySelector('.muchTime').textContent
        document.querySelector("#dist01").textContent = document.querySelector("#dist").textContent;
        document.querySelector("#calorie01").textContent = document.querySelector("#calorie").textContent;
        document.querySelector("#space01").textContent = document.querySelector("#space").textContent;
    }


    // 生成地图模态框 && 模拟地图运动
    let land = new BMap.Map("land");
    let add = 0.0001;
    let positionArr = [];
    let count = 0;

    function landMap() {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let lng = r.point.lng * 1 + add
                let lat = r.point.lat * 1 + add
                add = add + 0.0001;
                positionArr.push({ lng: lng, lat: lat })
                var point = new BMap.Point(lng, lat);
                land.centerAndZoom(point, 15);
                if (count > 0) {
                    drawLine(land, positionArr[count - 1], positionArr[count]);
                }
                count++;
            } else {
                alert('failed' + this.getStatus());
            }
        });
    }

    function drawLine(map, pointX, pointY) {
        var polyline = new BMap.Polyline([
            new BMap.Point(pointX.lng, pointX.lat),
            new BMap.Point(pointY.lng, pointY.lat)
        ], { strokeColor: "red", strokeWeight: 6, strokeOpacity: 0.5 });
        map.addOverlay(polyline);
    }
})