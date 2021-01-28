require("../css/ad.less");



document.querySelector('.adtime').onclick = function() {
    location.href = './login.html'
}

let countdown = document.querySelector('.countdown')

let timer = setInterval(cutDown, 1000)

function cutDown() {
    if (countdown.innerHTML == 1) {
        clearInterval(timer)
        location.href = './login.html'
    }
    countdown.innerHTML = countdown.innerHTML - 1
}