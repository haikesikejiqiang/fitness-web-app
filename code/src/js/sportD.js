require("../css/sportD.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')



document.ready(function() {

    document.querySelector('.head').onclick = function() {
        window.location.href = './my.html'
    }

    $untils.isLogin()
    $http.get('/users/mysportsBadge', {
        userId: window.localStorage.getItem('userId') - 0
    }, function(msg) {

        document.querySelector('.avatar').style.backgroundImage = `url('http://139.9.177.51:8099/${msg.data.user.imgurl}')`
        document.querySelector('#times').textContent = Math.ceil(msg.data.sports.times / 60)
        document.querySelector('#calorie').textContent = parseInt(msg.data.sports.calorie)
        document.querySelector('#usecalorie').textContent = parseInt(msg.data.sports.calorie)

    })

    $http.get('/sport/data/' + window.localStorage.getItem('userId'), {}, function(msg) {
        console.log(msg);
        // 这是渲染
        document.querySelector('#sumDays').textContent = parseInt(msg.data.continueDays)
        document.querySelector('#continueDays').textContent = parseInt(msg.data.sumDays)

        // 这是声明
        let date = [];
        let time = [];
        let obj = {}
        let pie = []

        // 这是数据处理
        msg.data.days.forEach(val => {
            date.push(val.date.substr(5))
            time.push(parseInt(val.dayTimes))
        });

        console.log(time);

        msg.data.days.forEach(val => {
            val.exerciseData.forEach(item => {
                let time = parseInt(item.time)
                obj[item.type] ? (obj[item.type] += time) : (obj[item.type] = time)
            })
        });

        let index = 0
        let bgArr = ["#58BB92", "#736171", "#EE5C43"];

        for (let key in obj) {
            pie.push({
                value: obj[key],
                name: key,
                itemStyle: { color: bgArr[index] }
            })
            index++
        }
        console.log(pie);

        // 这里是函数
        timeLength()

        function timeLength() {
            let option = {
                title: {
                    text: "近7天运动时长",
                    left: 10,
                    top: 20,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 400
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: date,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '直接访问',
                    center: ['30%', '50%'],
                    type: 'bar',
                    barWidth: '60%',
                    data: time,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
                                return colorList[params.dataIndex % colorList.length];
                            }
                        }
                    }
                }]
            };
            let Length = document.getElementById('Length');
            echarts.init(Length).setOption(option);




        }

        Classification()

        function Classification() {
            let option = {
                title: {
                    text: '运动分类',
                    left: 'center',
                    left: 10,
                    top: 20,
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 400
                    },
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    y: 'center',
                    itemWidth: 8,
                    itemHeight: 8,

                },
                series: [{
                    name: '运动分类',
                    type: 'pie',
                    radius: '70%',
                    data: pie,
                    label: {
                        show: true,
                        position: 'inner',
                        formatter: '{d}%',
                        color: '#fff'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };

            let ification = document.getElementById('ification');
            echarts.init(ification).setOption(option);
        }

    })



    bar()

    function bar() {
        let option = {
            title: {
                text: '近7日运动分类',
                left: 'center',
                left: 10,
                top: 20,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 400
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {
                data: ['跑步', '骑行', '训练'],
                right: 10,
                top: 'middle',
                orient: '',
                itemWidth: 8,
                itemHeight: 8,
            },
            grid: {
                left: '3%',
                right: '15%',
                bottom: '3%',
                containLabel: true,

            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['11-11', '11-10', '11-9', '11-8', '11-7', '11-6', '11-5']
            },
            series: [{

                    name: '跑步',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: false
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '骑行',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: false
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '训练',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: false
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };

        let strip = document.getElementById('strip');
        echarts.init(strip).setOption(option);
    }


    line()

    function line() {
        let option = {
            title: {
                text: '近7日训练次数',
                left: 'center',
                left: 10,
                top: 20,
                textStyle: {
                    fontSize: 14,
                    fontWeight: 400
                },
            },
            xAxis: {
                type: 'category',
                data: ['11-11', '11-10', '11-9', '11-8', '11-7', '11-6', '11-5']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                symbol: 'none'
            }]
        };

        let fold = document.getElementById('fold');
        echarts.init(fold).setOption(option);
    }



    setTimeout(function() {
        window.onresize = function() {

            Length.resize();
            ification.resize();
            strip.resize();
            fold.resize();

        }
    }, 200)
})