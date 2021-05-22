// ==UserScript==
// @name         LuoguEmojiSender
// @namespace    https://github.com/Maxmilite/LuoguEmojiSender
// @version      1.0
// @description  一款可以帮助您在洛谷轻松发送 QQ 表情信息的插件.
// @author       Maxmilite
// @match        https://www.luogu.com.cn/*
// @match        http://www.luogu.com.cn/*
// @updateURL   https://raw.fastgit.org/Maxmilite/LuoguEmojiSender/main/LuoguEmojiSender.js
// ==/UserScript==

(function() {
    const replaceElement = {
        "/qq": "![/qq](https://cdn.luogu.com.cn/upload/pic/62224.png)",
        "/cy": "![/cy](https://cdn.luogu.com.cn/upload/pic/62225.png)",
        "/kel": "![/kel](https://cdn.luogu.com.cn/upload/pic/62226.png)",
        "/kk": "![/kk](https://cdn.luogu.com.cn/upload/pic/62227.png)",
        "/dk": "![/dk](https://cdn.luogu.com.cn/upload/pic/62228.png)",
        "/xyx": "![/xyx](https://cdn.luogu.com.cn/upload/pic/62230.png)",
        "/jk": "![/jk](https://cdn.luogu.com.cn/upload/pic/62234.png)",
        "/qiang": "![/qiang](https://cdn.luogu.com.cn/upload/pic/62236.png)",
        "/ruo": "![/ruo](https://cdn.luogu.com.cn/upload/pic/62238.png)",
        "/ts": "![/ts](https://cdn.luogu.com.cn/upload/pic/62239.png)",
        "/yun": "![/yun](https://cdn.luogu.com.cn/upload/pic/62240.png)",
        "/yiw": "![/yiw](https://cdn.luogu.com.cn/upload/pic/62243.png)",
        "/se": "![/se](https://cdn.luogu.com.cn/upload/pic/62244.png)",
        "/px": "![/px](https://cdn.luogu.com.cn/upload/pic/62246.png)",
        "/wq": "![/wq](https://cdn.luogu.com.cn/upload/pic/62248.png)",
        "/fad": "![/fad](https://cdn.luogu.com.cn/upload/pic/62250.png)",
        "/youl": "![/youl](https://cdn.luogu.com.cn/upload/pic/69020.png)"
    };
    const prefix = "{", suffix = "}";
    document.addEventListener("keypress", function () {
        let sourceString = markdownPalettes.content;
        for (let i in replaceElement) {
            let newString = prefix + i + suffix;
            sourceString = sourceString.replaceAll(newString, replaceElement[i]);
        }
        markdownPalettes.content = sourceString;
    })
})();
