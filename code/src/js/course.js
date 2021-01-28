require("../css/course.less");
require('../lib/iconfont/iconfont.css')
require('../lib/weui/weui.css')

document.ready(function() {

    let userId = window.$untils.isLogin()
    sessionStorage.setItem('userId', userId)
    $untils.sportTab('course')
    $untils.footerTab('run')


    $http.get('/sports/courseList', {
        id: userId - 0
    }, function(msg) {
        if (msg.status === 0) {
            let data = msg.data;

            console.log(msg);

            // 获取最新课程
            console.log(data);
            let newCourse = data.filter(function(item) {
                return item.latest === 1;
            })
            console.log(newCourse);
            document.querySelector("#newCourse").dataset["cid"] = newCourse[0].courseId
            document.querySelector("#imgurl").src = 'http://139.9.177.51:8099' + newCourse[0].imgurl;
            document.querySelector("#name").textContent = newCourse[0].name;
            document.querySelector("#desc").textContent = newCourse[0].desc;


            // 获取普通课程
            let normalCourse = data.filter(function(item) {
                return item.latest === 0;
            })
            let resHTML = ""
            normalCourse.forEach(function(item) {
                resHTML += `
                <div class="item mt20" data-cid="${item.courseId}">
                <img src="${'http://139.9.177.51:8099' + item.imgurl}" alt=""  width="100%" height="140px">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                </div>
                `
            })
            document.querySelector("#normalCourse").innerHTML = resHTML
        }
    })

    document.querySelector("#newCourse").addEventListener("click", function() {
        sessionStorage.setItem('cid', this.dataset['cid']);
        window.location.href = './courseD.html'
    })

    document.querySelector('#normalCourse').addEventListener('click', function(e) {
        let father = e.target.parentNode
        if (!father.className) father = father.parentNode
        sessionStorage.setItem('cid', father.dataset['cid'])
        window.location.href = './courseD.html'
    })

})