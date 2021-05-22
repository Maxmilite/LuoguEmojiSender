// ==UserScript==
// @name         LuoguEmojiSender
// @namespace    https://github.com/Maxmilite/LuoguEmojiSender
// @version      1.0
// @description  A TamperMonkey addon which can help you send QQ emoji conveniently.
// @author       Maxmilite
// @match        https://www.luogu.com.cn/*
// @match        http://www.luogu.com.cn/*
// ==/UserScript==

(function() {
    const replaceElement = {
        "/qq": "![/qq](https://cdn.luogu.com.cn/upload/pic/62224.png)"

    };
    document.addEventListener("keypress", function () {
        let sourceString = markdownPalettes.content;
        for (let i in replaceElement) {
            sourceString = sourceString.replaceAll(i, replaceElement[i]);
        }
        markdownPalettes.content = sourceString;
    })
})();