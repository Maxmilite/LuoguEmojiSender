// ==UserScript==
// @name         LuoguEmojiSender
// @namespace    https://github.com/Maxmilite/LuoguEmojiSender
// @version      1.1
// @description  一款可以帮助您在洛谷轻松发送 QQ 表情信息的插件.
// @author       Maxmilite
// @match        https://www.luogu.com.cn/*
// @match        http://www.luogu.com.cn/*
// @updateURL   https://raw.fastgit.org/Maxmilite/LuoguEmojiSender/main/LuoguEmojiSender.js
// ==/UserScript==

(function() {
    // -------------------------此处为用户修改配置区--------------------------------
    
    // 此项定义前后缀功能，用于表情的识别，以默认配置为例
    // 如果在此配置下，当且仅当输入的内容为大括号包裹的qq表情代码（即 "{/代码}"）时才会进行替换操作。
    // 当然，您可以直接将其设置为空字符串，来达到无缝衔接的效果
    const prefix = "{", suffix = "}";

    // 此处为用户个性化设置区，输入格式按照 JSON 格式输入
    // 格式：" "表情代码": "![...](...)", "
    // 请注意，如果不是最后一行，该行后必须添加逗号。
    // 样例：" "/亲亲": "![](https://cdn.luogu.com.cn/upload/pic/62224.png)", "
    const userElement = {

    }
    
    // -------------------------上方为用户修改配置区--------------------------------

    // 1.1 更新内容：
    // 优化操作逻辑，增加用户配置区

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
    
    document.addEventListener("keypress", function () {
        for (let i in replaceElement) {
            let newString = prefix + i + suffix;
            if (typeof markdownPalettes != "undefined") {
                markdownPalettes.content = markdownPalettes.content.replaceAll(newString, replaceElement[i]);
            }
            if (document.getElementById("feed-content") != null) {
                document.getElementById("feed-content").value = document.getElementById("feed-content").value.replaceAll(newString, replaceElement[i]);
            }
        }
        for (let i in userElement) {
            let newString = prefix + i + suffix;
            if (typeof markdownPalettes != "undefined") {
                markdownPalettes.content = markdownPalettes.content.replaceAll(newString, userElement[i]);
            }
            if (document.getElementById("feed-content") != null) {
                document.getElementById("feed-content").value = document.getElementById("feed-content").value.replaceAll(newString, userElement[i]);
            }
        }
    })

    document.addEventListener("click", function () {
        for (let i in replaceElement) {
            let newString = prefix + i + suffix;
            if (typeof markdownPalettes != "undefined") {
                markdownPalettes.content = markdownPalettes.content.replaceAll(newString, replaceElement[i]);
            }
            if (document.getElementById("feed-content") != null) {
                document.getElementById("feed-content").value = document.getElementById("feed-content").value.replaceAll(newString, replaceElement[i]);
            }
        }
        for (let i in userElement) {
            let newString = prefix + i + suffix;
            if (typeof markdownPalettes != "undefined") {
                markdownPalettes.content = markdownPalettes.content.replaceAll(newString, userElement[i]);
            }
            if (document.getElementById("feed-content") != null) {
                document.getElementById("feed-content").value = document.getElementById("feed-content").value.replaceAll(newString, userElement[i]);
            }
        }
    })
})();
