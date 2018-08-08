(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/game/view/Chat/ChatConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '37569G206ZIcKUel0WCOXY1', 'ChatConfig', __filename);
// scripts/app/game/view/Chat/ChatConfig.js

"use strict";

var chatStage = 1;
//普通话男
var puTong1 = ["快点啦，都在等你呢！", "你的牌也太好了吧！", "牌这么好，想输都难呐！", "辛辛苦苦20年，一把回到解放前！", "你们是一伙的吧？", "等我一下，马上回来。"];
//普通话女
var puTong2 = ["快点啦，都在等你呢！", "你的牌也太好了吧！", "牌这么好，想输都难呐！", "辛辛苦苦20年，一把回到解放前！", "你们是一伙的吧？", "等我一下，马上回来。"];

var puTong = [puTong1, puTong2];

//潮州话男
var chaozhou1 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "妹啊，吕个地个乡里个？", "莫意思，我津去听下电话！", "且慢，我速速住来！"];
//潮州话女
var chaozhou2 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "莫意思，我津去听下电话！", "且慢，我速速住来！"];

var chaozhou = [chaozhou1, chaozhou2];

//揭阳话男
var jieyang1 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "妞死啊！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "妹啊，吕个地个乡里个？", "莫意思，我津去听下电话！", "且慢，我速速住来！"];
//潮州话女
var jieyang2 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "莫意思，我津去听下电话！", "且慢，我速速住来！"];

var jieyang = [jieyang1, jieyang2];

//汕头话男
var shantou1 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "爽死啊！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "妹啊，吕个地个乡里个？", "莫意思，我津去听下电话！", "且慢，我速速住来！"];
//潮州话女
var shantou2 = ["博妖猛下，博妖猛下！", "堵鞋潮，赢过吃补药！", "猛哇！粥熟哇！", "尚，过尚！", "副牌雅到通街市想无!", "静下呐，求财心迈切！", "兴到爱输欢无变!", "莫意思，我津去听下电话！", "且慢，我速速住来！"];

var shantou = [shantou1, shantou2];

module.exports = {
    puTong: puTong,
    chaozhou: chaozhou,
    jieyang: jieyang,
    shantou: shantou,
    chatStage: chatStage
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ChatConfig.js.map
        