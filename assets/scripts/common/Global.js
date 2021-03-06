window.IS_DEBUG = true
window.IS_EXAMINE = false
window.txtVersionMaster = "1.0.0.4"
window.txtVersionDev = "1.0.0.22"
versionType = "Test"

window.Card = {}
//黑桃 红桃 梅花 方块
Card.SPADE = 1
Card.HEART = 2
Card.CLUB = 3
Card.DIAMOND = 4

//客户端服务端时间差
window.timeOffset = 0
//是否重连
window.gIsReconnect = true
window.gIsPopNotice = true

//挤牌类型
window.squeezeType = {}
squeezeType.threeD = 1
squeezeType.slider = 2

// window.gHostDev = "http://120.79.56.57:8201" //开发服
// window.gHostTest = "http://120.78.177.52:8201" //测试服
// window.gHostPro = "http://119.23.108.92:8201" //正式服
window.gHostDev = "http://bjldev.ddpkcc.com:8201" //开发服
window.gHostTest = "http://bjltest.ddpkcc.com:8201" //测试服
window.gHostPro = "http://bjlpro.ddpkcc.com:8201" //正式服
window.gHost = window.gHostTest //默认测试服
window.isInit = false //初始化
cc.log("测试测试测试看看", gHost )

window.gUserData = {
    uid: 1,
    token: "",
    roomInfo: {
        rid: null,
        room_num: "0",
        game_status: 0,
    },
    dingdingData: {
        uToken : "",
    },
    testGroup_id : 0,
    playerInfo : null,
    password : null,
    forbidSetting : null,
}
//方便搜索
window.event = {
    status: 0
}

window.i18n = {
    "dd_no" : "丁丁号",
}

window.setExamine = function (isExamine) {
    //审核的时候丁丁号改成ID
    IS_EXAMINE = isExamine
    if (IS_EXAMINE) {
        i18n["dd_no"] = "ID"
        txtVersion = ""
    }
},

//常用函数
window.removeByValue = function (tbl, value) {
    for (var key in tbl) {
        if (value == tbl[key]) {
            tbl.splice(key, 1)
            // delete tbl[key]
            break
        }
    }
}

window.removeByIndex = function (tbl, index) {
    tbl.splice(index, 1)
    // delete tbl[index]
}

window.clone = function (obj) {
    if (typeof obj != 'object') {
        return obj
    }
    // var newobj = {}
    var newobj = []
    for (var attr in obj) {
        newobj[attr] = clone(obj[attr])
    }
    return newobj
}

window.tableNums = function (obj) {
    var nums = 0
    for (var attr in obj) {
        nums++
    }
    return nums
}

//获取服务器当前时间戳
window.getCurTime = function () {
    var curTime = Date.parse(new Date()) / 1000
    // cc.log("vvvv", curTime, timeOffset)
    return curTime - timeOffset
}

//类
// window.BaseObj = require("BaseObj")
// window.BaseScene = require("BaseScene")

//统一log接口
if (cc.sys.isNative) {
    cc.log = console.log
}

window.formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var min = date.getMinutes();
    min = min < 10 ? ('0' + min) : min;
    var sec = date.getSeconds();
    sec = sec < 10 ? ('0' + sec) : sec;
    return y + '-' + m + '-' + d + "  " + h + ":" + min + ":" + sec;
};

window.scheduleTimeOut = function (handler, target, delay) {
    delay = delay || 0
    cc.director.getScheduler().schedule(handler, target, 0, 0, delay, false)
}

window.outputObj = function (obj) {  
    cc.log("========", obj)
    var description = "";  
    for (var i in obj) {  
        cc.log("-------", i)
        // description += i + " = " + obj[i] + "\n";  
    }  
    return description
}  

// setExamine(true)
