var GameToAppHelper = require("GameToAppHelper");
var AppToGameHelper = {

};

AppToGameHelper.exitGame = function () {//应用主动退出游戏
    GameToAppHelper.ExitGame();
};

AppToGameHelper.backToGame = function () {//返回游戏
    // console.log("game返回游戏");
    // cc.global.isSmallWindowMode = false;
    // var tempClient = require('MjRequestSpecificClient');
    // tempClient.requestBusy(false);
    // cc.game.setFrameRate(60);

    // var mjSoundHelper = require('MjSoundHelper');
    // mjSoundHelper.playingBgMusic();

    //应用回到游戏恢复原来的音量
    console.log('!!返回游戏!!');
    var effectVolume = cc.sys.localStorage.getItem('effectVolume') || 0.5
    effectVolume = Number(effectVolume)
    if (cc.musicMgr) {
        cc.musicMgr.setEffectVolume(effectVolume)
    } 
    cc.log(cc.musicMgr, effectVolume, typeof(effectVolume))
    
};

// AppToGameHelper.groupCtrlNumChange = function(opt){//群管理分被修改
//     console.log(JSON.stringify(opt));
//     if(cc.gameConfig.clubId == opt.clubId){
//         var SeatCfg = require('SeatCfg');
//         SeatCfg.setCreateGroupCtrNum(opt.clubCtrlNum);
//         cc.global.rootNode.emit("ChangeGroupCtrNum");
//     }else{
//         console.log('clubId unequal');
//     }
// };

AppToGameHelper.onRechargeResponce = function (opt) {//游戏充值回调
    // cc.global.rootNode.emit("onRechargeResponce",Number(opt.code));
    cc.log("游戏充值回调!")
    if (!opt) {
        return
    }
    if (1 == opt.code) {
        cc.common.showMsgBox({ type: 1, msg: "支付成功" })
        cc.eventMgr.emit("updatePlayerInfo")
    }
    else if (2 == opt.code) {
        cc.common.showMsgBox({ type: 1, msg: "支付取消" })
    }
    else if (0 == opt.code) {
        cc.common.showMsgBox({ type: 1, msg: "支付失败" })
    }
    else if (3 == opt.code) {
        cc.common.showMsgBox({type: 2, msg: "配置不一致，请重启游戏", okCb: function () {
            GameToAppHelper.ExitGame()
        }})
    }
};

module.exports = AppToGameHelper;