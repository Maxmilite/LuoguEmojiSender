// ==UserScript==
// @name         LuoguEmojiSender
// @namespace    https://github.com/Maxmilite/LuoguEmojiSender
// @version      1.4.1
// @description  一款可以帮助您在洛谷轻松发送 QQ 表情信息的插件.
// @author       Maxmilite
// @match        https://www.luogu.com.cn/*
// @match        http://www.luogu.com.cn/*
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// ==/UserScript==

(function () {
    // -------------------------此处为用户修改配置区--------------------------------

    // 此项定义前后缀功能，用于表情的识别，以默认配置为例
    // 如果在此配置下，当且仅当输入的内容为大括号包裹的qq表情代码（即 "{/代码}"）时才会进行替换操作。
    // 当然，您可以直接将其设置为空字符串，来达到无缝衔接的效果。
    const prefix = "{", suffix = "}";

    // 此处为用户个性化设置区，输入格式按照 JSON 格式输入。
    // 格式：" "表情代码": "![...](...)", "
    // 请注意，如果不是最后一行，该行后必须添加逗号。
    // 样例：" "/亲亲": "![](![qq_emoji: qq](https://xn--9zr.tk/qq))", "
    const userElement = {

    }

    // -------------------------上方为用户修改配置区--------------------------------

    // 这是第一代 LuoguEmojiSender 的最终版本，内容已经相当完善，此后作者将会着力于第二代的开发，第一代基本不会更新。
    // 最后更新时间 2021.5.30
    // 最后版本 1.4.1
    // 第二代目标：实现图形化，近似于 QQ 发送表情
    // 作者在这个版本留下了一个臭了的彩蛋

    // 1.1 更新内容：
    // 优化操作逻辑，增加用户配置区
    // 1.2 更新内容：
    // 增加了更多的 QQ 图片，更改了图床
    // 1.3 更新内容：
    // 进一步优化操作逻辑，修复了图片加载的一个BUG，现在可以无忧无虑使用无缝模式了
    // 1.3.1 更新内容：
    // 紧急修复一个由菜刀表情引发的严重BUG
    // 1.4 更新内容：
    // 修复了 1.3.1 版本更新日志版本号的bug，修复输入问题，第一代最终版本
    // 修复光标漂移问题，修复无缝衔接问题，修复菜刀表情问题，修复若干问题
    // 1.4.1 更新内容：
    // 更换表情源，增加 “替换表情” 按钮，具体详见说明文档。

    const replaceElement = {
        "/aini": "![qq_emoji: aini](https://xn--9zr.tk/aini)",
        "/aiq": "![qq_emoji: aiq](https://xn--9zr.tk/aiq)",
        "/am": "![qq_emoji: am](https://xn--9zr.tk/am)",
        "/azgc": "![qq_emoji: azgc](https://xn--9zr.tk/azgc)",
        "/baiy": "![qq_emoji: baiy](https://xn--9zr.tk/baiy)",
        "/bangbangt": "![qq_emoji: bangbangt](https://xn--9zr.tk/bangbangt)",
        "/banzz": "![qq_emoji: banzz](https://xn--9zr.tk/banzz)",
        "/baojin": "![qq_emoji: baojin](https://xn--9zr.tk/baojin)",
        "/bb": "![qq_emoji: bb](https://xn--9zr.tk/bb)",
        "/bkx": "![qq_emoji: bkx](https://xn--9zr.tk/bkx)",
        "/bl": "![qq_emoji: bl](https://xn--9zr.tk/bl)",
        "/bobo": "![qq_emoji: bobo](https://xn--9zr.tk/bobo)",
        "/bp": "![qq_emoji: bp](https://xn--9zr.tk/bp)",
        "/bq": "![qq_emoji: bq](https://xn--9zr.tk/bq)",
        "/bs": "![qq_emoji: bs](https://xn--9zr.tk/bs)",
        "/bt": "![qq_emoji: bt](https://xn--9zr.tk/bt)",
        "/bu": "![qq_emoji: bu](https://xn--9zr.tk/bu)",
        "/bz": "![qq_emoji: bz](https://xn--9zr.tk/bz)",
        "/cd": "![qq_emoji: cd](https://xn--9zr.tk/cd)",
        "/cengyiceng": "![qq_emoji: cengyiceng](https://xn--9zr.tk/cengyiceng)",
        "/cg": "![qq_emoji: cg](https://xn--9zr.tk/cg)",
        "/ch": "![qq_emoji: ch](https://xn--9zr.tk/ch)",
        "/chi": "![qq_emoji: chi](https://xn--9zr.tk/chi)",
        "/cj": "![qq_emoji: cj](https://xn--9zr.tk/cj)",
        "/cp": "![qq_emoji: cp](https://xn--9zr.tk/cp)",
        "/cs": "![qq_emoji: cs](https://xn--9zr.tk/cs)",
        "/cy": "![qq_emoji: cy](https://xn--9zr.tk/cy)",
        "/dan": "![qq_emoji: dan](https://xn--9zr.tk/dan)",
        "/dao": "![qq_emoji: dao](https://xn--9zr.tk/dao)",
        "/db": "![qq_emoji: db](https://xn--9zr.tk/db)",
        "/dg": "![qq_emoji: dg](https://xn--9zr.tk/dg)",
        "/dgg": "![qq_emoji: dgg](https://xn--9zr.tk/dgg)",
        "/dk": "![qq_emoji: dk](https://xn--9zr.tk/dk)",
        "/dl": "![qq_emoji: dl](https://xn--9zr.tk/dl)",
        "/doge": "![qq_emoji: doge](https://xn--9zr.tk/doge)",
        "/dx": "![qq_emoji: dx](https://xn--9zr.tk/dx)",
        "/dy": "![qq_emoji: dy](https://xn--9zr.tk/dy)",
        "/dz": "![qq_emoji: dz](https://xn--9zr.tk/dz)",
        "/ee": "![qq_emoji: ee](https://xn--9zr.tk/ee)",
        "/emm": "![qq_emoji: emm](https://xn--9zr.tk/emm)",
        "/fad": "![qq_emoji: fad](https://xn--9zr.tk/fad)",
        "/fade": "![qq_emoji: fade](https://xn--9zr.tk/fade)",
        "/fan": "![qq_emoji: fan](https://xn--9zr.tk/fan)",
        "/fd": "![qq_emoji: fd](https://xn--9zr.tk/fd)",
        "/fendou": "![qq_emoji: fendou](https://xn--9zr.tk/fendou)",
        "/fj": "![qq_emoji: fj](https://xn--9zr.tk/fj)",
        "/fn": "![qq_emoji: fn](https://xn--9zr.tk/fn)",
        "/fw": "![qq_emoji: fw](https://xn--9zr.tk/fw)",
        "/gg": "![qq_emoji: gg](https://xn--9zr.tk/gg)",
        "/gy": "![qq_emoji: gy](https://xn--9zr.tk/gy)",
        "/gz": "![qq_emoji: gz](https://xn--9zr.tk/gz)",
        "/hanx": "![qq_emoji: hanx](https://xn--9zr.tk/hanx)",
        "/haob": "![qq_emoji: haob](https://xn--9zr.tk/haob)",
        "/hb": "![qq_emoji: hb](https://xn--9zr.tk/hb)",
        "/hc": "![qq_emoji: hc](https://xn--9zr.tk/hc)",
        "/hd": "![qq_emoji: hd](https://xn--9zr.tk/hd)",
        "/hec": "![qq_emoji: hec](https://xn--9zr.tk/hec)",
        "/hhd": "![qq_emoji: hhd](https://xn--9zr.tk/hhd)",
        "/hn": "![qq_emoji: hn](https://xn--9zr.tk/hn)",
        "/hp": "![qq_emoji: hp](https://xn--9zr.tk/hp)",
        "/hq": "![qq_emoji: hq](https://xn--9zr.tk/hq)",
        "/hsh": "![qq_emoji: hsh](https://xn--9zr.tk/hsh)",
        "/ht": "![qq_emoji: ht](https://xn--9zr.tk/ht)",
        "/huaix": "![qq_emoji: huaix](https://xn--9zr.tk/huaix)",
        "/hx": "![qq_emoji: hx](https://xn--9zr.tk/hx)",
        "/jd": "![qq_emoji: jd](https://xn--9zr.tk/jd)",
        "/jh": "![qq_emoji: jh](https://xn--9zr.tk/jh)",
        "/jiaybb": "![qq_emoji: jiaybb](https://xn--9zr.tk/jiaybb)",
        "/jiaybs": "![qq_emoji: jiaybs](https://xn--9zr.tk/jiaybs)",
        "/jie": "![qq_emoji: jie](https://xn--9zr.tk/jie)",
        "/jk": "![qq_emoji: jk](https://xn--9zr.tk/jk)",
        "/jw": "![qq_emoji: jw](https://xn--9zr.tk/jw)",
        "/jx": "![qq_emoji: jy](https://xn--9zr.tk/jx)",
        "/jy": "![qq_emoji: jx](https://xn--9zr.tk/jy)",
        "/ka": "![qq_emoji: ka](https://xn--9zr.tk/ka)",
        "/kb": "![qq_emoji: kb](https://xn--9zr.tk/kb)",
        "/kel": "![qq_emoji: kel](https://xn--9zr.tk/kel)",
        "/kf": "![qq_emoji: kf](https://xn--9zr.tk/kf)",
        "/kg": "![qq_emoji: kg](https://xn--9zr.tk/kg)",
        "/kk": "![qq_emoji: kk](https://xn--9zr.tk/kk)",
        "/kl": "![qq_emoji: kl](https://xn--9zr.tk/kl)",
        "/kt": "![qq_emoji: kt](https://xn--9zr.tk/kt)",
        "/kuk": "![qq_emoji: kuk](https://xn--9zr.tk/kuk)",
        "/kun": "![qq_emoji: kun](https://xn--9zr.tk/kun)",
        "/kzht": "![qq_emoji: kzht](https://xn--9zr.tk/kzht)",
        "/lb": "![qq_emoji: lb](https://xn--9zr.tk/lb)",
        "/lengh": "![qq_emoji: lengh](https://xn--9zr.tk/lengh)",
        "/lh": "![qq_emoji: lh](https://xn--9zr.tk/lh)",
        "/ll": "![qq_emoji: ll](https://xn--9zr.tk/ll)",
        "/lm": "![qq_emoji: lm](https://xn--9zr.tk/lm)",
        "/lq": "![qq_emoji: lq](https://xn--9zr.tk/lq)",
        "/lw": "![qq_emoji: lw](https://xn--9zr.tk/lw)",
        "/lyj": "![qq_emoji: lyj](https://xn--9zr.tk/lyj)",
        "/mdfq": "![qq_emoji: mdfq](https://xn--9zr.tk/mdfq)",
        "/mg": "![qq_emoji: mg](https://xn--9zr.tk/mg)",
        "/mm": "![qq_emoji: mm](https://xn--9zr.tk/mm)",
        "/ng": "![qq_emoji: ng](https://xn--9zr.tk/ng)",
        "/nkt": "![qq_emoji: nkt](https://xn--9zr.tk/nkt)",
        "/oh": "![qq_emoji: oh](https://xn--9zr.tk/oh)",
        "/oy": "![qq_emoji: oy](https://xn--9zr.tk/oy)",
        "/pch": "![qq_emoji: pch](https://xn--9zr.tk/pch)",
        "/pj": "![qq_emoji: pj](https://xn--9zr.tk/pj)",
        "/pp": "![qq_emoji: pp](https://xn--9zr.tk/pp)",
        "/pt": "![qq_emoji: pt](https://xn--9zr.tk/pt)",
        "/px": "![qq_emoji: px](https://xn--9zr.tk/px)",
        "/qd": "![qq_emoji: qd](https://xn--9zr.tk/qd)",
        "/qiang": "![qq_emoji: qiang](https://xn--9zr.tk/qiang)",
        "/qiao": "![qq_emoji: qiao](https://xn--9zr.tk/qiao)",
        "/qq": "![qq_emoji: qq](https://xn--9zr.tk/qq)",
        "/qt": "![qq_emoji: qt](https://xn--9zr.tk/qt)",
        "/ruo": "![qq_emoji: ruo](https://xn--9zr.tk/ruo)",
        "/sa": "![qq_emoji: sa](https://xn--9zr.tk/sa)",
        "/se": "![qq_emoji: se](https://xn--9zr.tk/se)",
        "/sh": "![qq_emoji: sh](https://xn--9zr.tk/sh)",
        "/shd": "![qq_emoji: shd](https://xn--9zr.tk/shd)",
        "/shl": "![qq_emoji: shl](https://xn--9zr.tk/shl)",
        "/shuai": "![qq_emoji: shuai](https://xn--9zr.tk/shuai)",
        "/shui": "![qq_emoji: shui](https://xn--9zr.tk/shui)",
        "/shxi": "![qq_emoji: shxi](https://xn--9zr.tk/shxi)",
        "/sr": "![qq_emoji: sr](https://xn--9zr.tk/sr)",
        "/tiao": "![qq_emoji: tiao](https://xn--9zr.tk/tiao)",
        "/tl": "![qq_emoji: tl](https://xn--9zr.tk/tl)",
        "/tnl": "![qq_emoji: tnl](https://xn--9zr.tk/tnl)",
        "/tp": "![qq_emoji: tp](https://xn--9zr.tk/tp)",
        "/ts": "![qq_emoji: ts](https://xn--9zr.tk/ts)",
        "/tsh": "![qq_emoji: tsh](https://xn--9zr.tk/tsh)",
        "/tt": "![qq_emoji: tt](https://xn--9zr.tk/tt)",
        "/tuu": "![qq_emoji: tuu](https://xn--9zr.tk/tuu)",
        "/tx": "![qq_emoji: tx](https://xn--9zr.tk/tx)",
        "/ty": "![qq_emoji: ty](https://xn--9zr.tk/ty)",
        "/tyt": "![qq_emoji: tyt](https://xn--9zr.tk/tyt)",
        "/wbk": "![qq_emoji: wbk](https://xn--9zr.tk/wbk)",
        "/whl": "![qq_emoji: whl](https://xn--9zr.tk/whl)",
        "/wl": "![qq_emoji: wl](https://xn--9zr.tk/wl)",
        "/wn": "![qq_emoji: wn](https://xn--9zr.tk/wn)",
        "/wosl": "![qq_emoji: wosl](https://xn--9zr.tk/wosl)",
        "/wq": "![qq_emoji: wq](https://xn--9zr.tk/wq)",
        "/ws": "![qq_emoji: ws](https://xn--9zr.tk/ws)",
        "/wul": "![qq_emoji: wul](https://xn--9zr.tk/wul)",
        "/wx": "![qq_emoji: wx](https://xn--9zr.tk/wx)",
        "/wzm": "![qq_emoji: wzm](https://xn--9zr.tk/wzm)",
        "/xhx": "![qq_emoji: xhx](https://xn--9zr.tk/xhx)",
        "/xia": "![qq_emoji: xia](https://xn--9zr.tk/xia)",
        "/xig": "![qq_emoji: xig](https://xn--9zr.tk/xig)",
        "/xin": "![qq_emoji: xin](https://xn--9zr.tk/xin)",
        "/xjj": "![qq_emoji: xjj](https://xn--9zr.tk/xjj)",
        "/xk": "![qq_emoji: xk](https://xn--9zr.tk/xk)",
        "/xs": "![qq_emoji: xs](https://xn--9zr.tk/xs)",
        "/xu": "![qq_emoji: xu](https://xn--9zr.tk/xu)",
        "/xw": "![qq_emoji: xw](https://xn--9zr.tk/xw)",
        "/xy": "![qq_emoji: xy](https://xn--9zr.tk/xy)",
        "/xyx": "![qq_emoji: xyx](https://xn--9zr.tk/xyx)",
        "/yao": "![qq_emoji: yao](https://xn--9zr.tk/yao)",
        "/yb": "![qq_emoji: yb](https://xn--9zr.tk/yb)",
        "/yhh": "![qq_emoji: yhh](https://xn--9zr.tk/yhh)",
        "/yiw": "![qq_emoji: yiw](https://xn--9zr.tk/yiw)",
        "/yl": "![qq_emoji: yl](https://xn--9zr.tk/yl)",
        "/youl": "![qq_emoji: youl](https://xn--9zr.tk/youl)",
        "/youtj": "![qq_emoji: youtj](https://xn--9zr.tk/youtj)",
        "/yt": "![qq_emoji: yt](https://xn--9zr.tk/yt)",
        "/yun": "![qq_emoji: yun](https://xn--9zr.tk/yun)",
        "/yx": "![qq_emoji: yx](https://xn--9zr.tk/yx)",
        "/zhd": "![qq_emoji: zhd](https://xn--9zr.tk/zhd)",
        "/zhem": "![qq_emoji: zhem](https://xn--9zr.tk/zhem)",
        "/zhh": "![qq_emoji: zhh](https://xn--9zr.tk/zhh)",
        "/zhm": "![qq_emoji: zhm](https://xn--9zr.tk/zhm)",
        "/zhq": "![qq_emoji: zhq](https://xn--9zr.tk/zhq)",
        "/zj": "![qq_emoji: zj](https://xn--9zr.tk/zj)",
        "/zk": "![qq_emoji: zk](https://xn--9zr.tk/zk)",
        "/zq": "![qq_emoji: zq](https://xn--9zr.tk/zq)",
        "/zt": "![qq_emoji: zt](https://xn--9zr.tk/zt)",
        "/zuotj": "![qq_emoji: zuotj](https://xn--9zr.tk/zuotj)",
        "/114514": "[![为什么您会找到一个在 QQ 表情里没有的东西](https://z3.ax1x.com/2021/05/30/2Eook9.png)](https://github.com/Maxmilite/LuoguEmojiSender)"
    };

    const $ = unsafeWindow.$ || jQuery, markdownPalettes = unsafeWindow.markdownPalettes;

    function getSubString(sourceString = "", findPos = -1) {
        if (findPos == -1) {
            return "9zr.tk";
        }
        if (findPos <= 5) {
            return "";
        }
        let resultString = "";
        for (let i = findPos - 5; i < findPos; i++) {
            resultString += sourceString[i];
        }
        // if (resultString == "tps:/") {
        //     return "9zr.tk";
        // }
        return resultString;
    }

    function sliceString(sourceString = "", leftSide = 0, rightSide = 0) {
        let resultString = ""
        for (let i = leftSide; i <= rightSide; i++) {
            resultString += sourceString[i];
        }
        return resultString;
    }

    function replaceString(stringToChange = "") {
        let isChanged = false;
        for (let i in replaceElement) {
            let changedStr = prefix + i + suffix;
            while (getSubString(stringToChange, stringToChange.lastIndexOf(changedStr)) != "9zr.tk") {
                isChanged = true;
                // stringToChange = stringToChange.replace(changedStr, replaceElement[i]);
                stringToChange = sliceString(stringToChange, 0, stringToChange.lastIndexOf(changedStr) - 1) + replaceElement[i] + sliceString(stringToChange, stringToChange.lastIndexOf(changedStr) + changedStr.length, stringToChange.length - 1);
            }
        }
        for (let i in userElement) {
            let changedStr = prefix + i + suffix;
            while (getSubString(stringToChange, stringToChange.lastIndexOf(changedStr)) != "9zr.tk") {
                isChanged = true;
                // stringToChange = stringToChange.replace(changedStr, userElement[i]);
                stringToChange = sliceString(stringToChange, 0, stringToChange.lastIndexOf(changedStr) - 1) + userElement[i] + sliceString(stringToChange, stringToChange.lastIndexOf(changedStr) + changedStr.length, stringToChange.length - 1);
            }
        }
        if (isChanged == true) {
            return stringToChange;
        }
        else {
            return undefined;
        }
    }

    function main() {
        if (typeof markdownPalettes != "undefined") {
            let changedStr = replaceString($(".CodeMirror-wrap textarea").val());
            if (changedStr != undefined) {
                $(".CodeMirror-wrap textarea").val(changedStr);
                $(".CodeMirror-wrap textarea").trigger("input");
            }
        }
        if (document.getElementById("feed-content") != null) {
            let changedStr = replaceString(document.getElementById("feed-content").value);
            if (changedStr != undefined) {
                document.getElementById("feed-content").value = changedStr;
            }
        }
    }

    function replaceAll() {
        if (replaceString(markdownPalettes.content) != undefined) {
            markdownPalettes.content = replaceString(markdownPalettes.content);
        }
        else {
            return;
        }
    }

    function init() {
        $(`<li data-v-6d5597b1 id="replaceEmoji">
                <a data-v-6d5597b1="" title="替换表情" unselectable="on">
                    😀
                </a>
            </li>`).appendTo($(".mp-editor-menu"));
        $("#replaceEmoji").on("click", function() {
            replaceAll();
        });
    }

    // It seemed this function didn't work :(
    // To be fixed
    // Fixed on 2021.5.30

    document.addEventListener("input", function () {
        main();
    })
    init();

})();
