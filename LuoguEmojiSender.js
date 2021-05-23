// ==UserScript==
// @name         LuoguEmojiSender
// @namespace    https://github.com/Maxmilite/LuoguEmojiSender
// @version      1.3
// @description  一款可以帮助您在洛谷轻松发送 QQ 表情信息的插件.
// @author       Maxmilite
// @match        https://www.luogu.com.cn/*
// @match        http://www.luogu.com.cn/*
// @updateURL   https://raw.fastgit.org/Maxmilite/LuoguEmojiSender/main/LuoguEmojiSender.js
// @require      https://cdn.luogu.com.cn/js/jquery-2.1.1.min.js
// @require      https://cdn.luogu.com.cn/markdown-palettes/markdown-palettes.min.js?ver=20190219
// ==/UserScript==

(function () {
    // -------------------------此处为用户修改配置区--------------------------------

    // 此项定义前后缀功能，用于表情的识别，以默认配置为例
    // 如果在此配置下，当且仅当输入的内容为大括号包裹的qq表情代码（即 "{/代码}"）时才会进行替换操作。
    // 当然，您可以直接将其设置为空字符串，来达到无缝衔接的效果
    const prefix = "{", suffix = "}";

    // 此处为用户个性化设置区，输入格式按照 JSON 格式输入
    // 格式：" "表情代码": "![...](...)", "
    // 请注意，如果不是最后一行，该行后必须添加逗号。
    // 样例：" "/亲亲": "![](![qq_emoji: qq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qq.gif))", "
    const userElement = {

    }

    // -------------------------上方为用户修改配置区--------------------------------

    // 1.1 更新内容：
    // 优化操作逻辑，增加用户配置区
    // 1.2 更新内容：
    // 增加了更多的 QQ 图片，更改了图床
    // 1.3 更新内容：
    // 进一步优化操作逻辑，修复了图片加载的一个BUG，现在可以无忧无虑使用无缝模式了

    const replaceElement = {
        "/aini": "![qq_emoji: aini](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/aini.gif)",
        "/aiq": "![qq_emoji: aiq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/aiq.gif)",
        "/am": "![qq_emoji: am](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/am.gif)",
        "/azgc": "![qq_emoji: azgc](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/azgc.gif)",
        "/baiy": "![qq_emoji: baiy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/baiy.gif)",
        "/bangbangt": "![qq_emoji: bangbangt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bangbangt.gif)",
        "/banzz": "![qq_emoji: banzz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/banzz.gif)",
        "/baojin": "![qq_emoji: baojin](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/baojin.gif)",
        "/bb": "![qq_emoji: bb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bb.gif)",
        "/bkx": "![qq_emoji: bkx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bkx.gif)",
        "/bl": "![qq_emoji: bl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bl.gif)",
        "/bobo": "![qq_emoji: bobo](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bobo.gif)",
        "/bp": "![qq_emoji: bp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bp.gif)",
        "/bq": "![qq_emoji: bq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bq.gif)",
        "/bs": "![qq_emoji: bs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bs.gif)",
        "/bt": "![qq_emoji: bt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bt.gif)",
        "/bu": "![qq_emoji: bu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bu.gif)",
        "/bz": "![qq_emoji: bz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bz.gif)",
        "/cd": "![qq_emoji: cd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cd.gif)",
        "/cengyiceng": "![qq_emoji: cengyiceng](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cengyiceng.gif)",
        "/cg": "![qq_emoji: cg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cg.gif)",
        "/ch": "![qq_emoji: ch](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ch.gif)",
        "/chi": "![qq_emoji: chi](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/chi.gif)",
        "/cj": "![qq_emoji: cj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cj.gif)",
        "/cp": "![qq_emoji: cp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cp.gif)",
        "/cs": "![qq_emoji: cs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cs.gif)",
        "/cy": "![qq_emoji: cy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cy.gif)",
        "/dan": "![qq_emoji: dan](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dan.gif)",
        "/dao": "![qq_emoji: dao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dao.gif)",
        "/db": "![qq_emoji: db](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/db.gif)",
        "/dg": "![qq_emoji: dg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dg.gif)",
        "/dgg": "![qq_emoji: dgg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dgg.gif)",
        "/dk": "![qq_emoji: dk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dk.gif)",
        "/dl": "![qq_emoji: dl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dl.gif)",
        "/doge": "![qq_emoji: doge](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/doge.gif)",
        "/dx": "![qq_emoji: dx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dx.gif)",
        "/dy": "![qq_emoji: dy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dy.gif)",
        "/dz": "![qq_emoji: dz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dz.gif)",
        "/ee": "![qq_emoji: ee](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ee.gif)",
        "/emm": "![qq_emoji: emm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/emm.gif)",
        "/fad": "![qq_emoji: fad](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fad.gif)",
        "/fade": "![qq_emoji: fade](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fade.gif)",
        "/fan": "![qq_emoji: fan](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fan.gif)",
        "/fd": "![qq_emoji: fd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fd.gif)",
        "/fendou": "![qq_emoji: fendou](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fendou.gif)",
        "/fj": "![qq_emoji: fj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fj.gif)",
        "/fn": "![qq_emoji: fn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fn.gif)",
        "/fw": "![qq_emoji: fw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fw.gif)",
        "/gg": "![qq_emoji: gg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gg.gif)",
        "/gy": "![qq_emoji: gy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gy.gif)",
        "/gz": "![qq_emoji: gz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gz.gif)",
        "/hanx": "![qq_emoji: hanx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hanx.gif)",
        "/haob": "![qq_emoji: haob](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/haob.gif)",
        "/hb": "![qq_emoji: hb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hb.gif)",
        "/hc": "![qq_emoji: hc](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hc.gif)",
        "/hd": "![qq_emoji: hd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hd.gif)",
        "/hec": "![qq_emoji: hec](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hec.gif)",
        "/hhd": "![qq_emoji: hhd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hhd.gif)",
        "/hn": "![qq_emoji: hn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hn.gif)",
        "/hp": "![qq_emoji: hp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hp.gif)",
        "/hq": "![qq_emoji: hq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hq.gif)",
        "/hsh": "![qq_emoji: hsh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hsh.gif)",
        "/ht": "![qq_emoji: ht](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ht.gif)",
        "/huaix": "![qq_emoji: huaix](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/huaix.gif)",
        "/hx": "![qq_emoji: hx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hx.gif)",
        "/jd": "![qq_emoji: jd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jd.gif)",
        "/jh": "![qq_emoji: jh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jh.gif)",
        "/jiaybb": "![qq_emoji: jiaybb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jiaybb.gif)",
        "/jiaybs": "![qq_emoji: jiaybs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jiaybs.gif)",
        "/jie": "![qq_emoji: jie](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jie.gif)",
        "/jk": "![qq_emoji: jk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jk.gif)",
        "/jw": "![qq_emoji: jw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jw.gif)",
        "/jx": "![qq_emoji: jx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jx.gif)",
        "/ka": "![qq_emoji: ka](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ka.gif)",
        "/kb": "![qq_emoji: kb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kb.gif)",
        "/kel": "![qq_emoji: kel](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kel.gif)",
        "/kf": "![qq_emoji: kf](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kf.gif)",
        "/kg": "![qq_emoji: kg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kg.gif)",
        "/kk": "![qq_emoji: kk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kk.gif)",
        "/kl": "![qq_emoji: kl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kl.gif)",
        "/kt": "![qq_emoji: kt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kt.gif)",
        "/kuk": "![qq_emoji: kuk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kuk.gif)",
        "/kun": "![qq_emoji: kun](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kun.gif)",
        "/kzht": "![qq_emoji: kzht](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kzht.gif)",
        "/lb": "![qq_emoji: lb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lb.gif)",
        "/lengh": "![qq_emoji: lengh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lengh.gif)",
        "/lh": "![qq_emoji: lh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lh.gif)",
        "/ll": "![qq_emoji: ll](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ll.gif)",
        "/lm": "![qq_emoji: lm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lm.gif)",
        "/lq": "![qq_emoji: lq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lq.gif)",
        "/lw": "![qq_emoji: lw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lw.gif)",
        "/lyj": "![qq_emoji: lyj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lyj.gif)",
        "/mdfq": "![qq_emoji: mdfq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mdfq.gif)",
        "/mg": "![qq_emoji: mg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mg.gif)",
        "/mm": "![qq_emoji: mm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mm.gif)",
        "/ng": "![qq_emoji: ng](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ng.gif)",
        "/nkt": "![qq_emoji: nkt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/nkt.gif)",
        "/oh": "![qq_emoji: oh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/oh.gif)",
        "/oy": "![qq_emoji: oy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/oy.gif)",
        "/pch": "![qq_emoji: pch](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pch.gif)",
        "/pj": "![qq_emoji: pj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pj.gif)",
        "/pp": "![qq_emoji: pp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pp.gif)",
        "/pt": "![qq_emoji: pt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pt.gif)",
        "/px": "![qq_emoji: px](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/px.gif)",
        "/qd": "![qq_emoji: qd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qd.gif)",
        "/qiang": "![qq_emoji: qiang](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qiang.gif)",
        "/qiao": "![qq_emoji: qiao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qiao.gif)",
        "/qq": "![qq_emoji: qq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qq.gif)",
        "/qt": "![qq_emoji: qt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qt.gif)",
        "/ruo": "![qq_emoji: ruo](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ruo.gif)",
        "/sa": "![qq_emoji: sa](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sa.gif)",
        "/se": "![qq_emoji: se](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/se.gif)",
        "/sh": "![qq_emoji: sh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sh.gif)",
        "/shd": "![qq_emoji: shd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shd.gif)",
        "/shl": "![qq_emoji: shl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shl.gif)",
        "/shuai": "![qq_emoji: shuai](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shuai.gif)",
        "/shui": "![qq_emoji: shui](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shui.gif)",
        "/shxi": "![qq_emoji: shxi](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shxi.gif)",
        "/sr": "![qq_emoji: sr](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sr.gif)",
        "/tiao": "![qq_emoji: tiao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tiao.gif)",
        "/tl": "![qq_emoji: tl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tl.gif)",
        "/tnl": "![qq_emoji: tnl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tnl.gif)",
        "/tp": "![qq_emoji: tp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tp.gif)",
        "/ts": "![qq_emoji: ts](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ts.gif)",
        "/tsh": "![qq_emoji: tsh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tsh.gif)",
        "/tt": "![qq_emoji: tt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tt.gif)",
        "/tuu": "![qq_emoji: tuu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tuu.gif)",
        "/tx": "![qq_emoji: tx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tx.gif)",
        "/ty": "![qq_emoji: ty](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ty.gif)",
        "/tyt": "![qq_emoji: tyt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tyt.gif)",
        "/wbk": "![qq_emoji: wbk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wbk.gif)",
        "/whl": "![qq_emoji: whl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/whl.gif)",
        "/wl": "![qq_emoji: wl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wl.gif)",
        "/wn": "![qq_emoji: wn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wn.gif)",
        "/wosl": "![qq_emoji: wosl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wosl.gif)",
        "/wq": "![qq_emoji: wq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wq.gif)",
        "/ws": "![qq_emoji: ws](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ws.gif)",
        "/wul": "![qq_emoji: wul](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wul.gif)",
        "/wx": "![qq_emoji: wx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wx.gif)",
        "/wzm": "![qq_emoji: wzm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wzm.gif)",
        "/xhx": "![qq_emoji: xhx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xhx.gif)",
        "/xia": "![qq_emoji: xia](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xia.gif)",
        "/xig": "![qq_emoji: xig](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xig.gif)",
        "/xin": "![qq_emoji: xin](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xin.gif)",
        "/xjj": "![qq_emoji: xjj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xjj.gif)",
        "/xk": "![qq_emoji: xk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xk.gif)",
        "/xs": "![qq_emoji: xs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xs.gif)",
        "/xu": "![qq_emoji: xu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xu.gif)",
        "/xw": "![qq_emoji: xw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xw.gif)",
        "/xy": "![qq_emoji: xy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xy.gif)",
        "/xyx": "![qq_emoji: xyx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xyx.gif)",
        "/yao": "![qq_emoji: yao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yao.gif)",
        "/yb": "![qq_emoji: yb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yb.gif)",
        "/yhh": "![qq_emoji: yhh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yhh.gif)",
        "/yiw": "![qq_emoji: yiw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yiw.gif)",
        "/yl": "![qq_emoji: yl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yl.gif)",
        "/youl": "![qq_emoji: youl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/youl.gif)",
        "/youtj": "![qq_emoji: youtj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/youtj.gif)",
        "/yt": "![qq_emoji: yt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yt.gif)",
        "/yun": "![qq_emoji: yun](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yun.gif)",
        "/yx": "![qq_emoji: yx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yx.gif)",
        "/zhd": "![qq_emoji: zhd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhd.gif)",
        "/zhem": "![qq_emoji: zhem](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhem.gif)",
        "/zhh": "![qq_emoji: zhh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhh.gif)",
        "/zhm": "![qq_emoji: zhm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhm.gif)",
        "/zhq": "![qq_emoji: zhq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhq.gif)",
        "/zj": "![qq_emoji: zj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zj.gif)",
        "/zk": "![qq_emoji: zk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zk.gif)",
        "/zq": "![qq_emoji: zq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zq.gif)",
        "/zt": "![qq_emoji: zt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zt.gif)",
        "/zuotj": "![qq_emoji: zuotj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zuotj.gif)"
    };

    function main() {
        let stringTochange = new String, sourceString = new String, newString = new String;
        if (typeof markdownPalettes != "undefined")
            stringToChange = markdownPalettes.content, sourceString = markdownPalettes.content;
        else if (document.getElementById("feed-content") != null)
            stringToChange = document.getElementById("feed-content").value, sourceString = document.getElementById("feed-content").value;
        else
            return false;
        for (let i in replaceElement) {
            newString = prefix + i + suffix;
            stringToChange = stringToChange.replaceAll(newString, replaceElement[i]);
        }
        for (let i in userElement) {
            newString = prefix + i + suffix;
            stringToChange = stringToChange.replaceAll(newString, userElement[i]);
        }
        if (typeof markdownPalettes != "undefined")
            markdownPalettes.content = stringToChange;
        else if (document.getElementById("feed-content") != null)
            document.getElementById("feed-content").value = stringToChange;
        if (stringToChange == sourceString)
            return false;
        else
            return true;
    }

    // It seemed this function didn't work :(
    // To be fixed
    function moveEnd() {
        var move = jQuery.Event("keydown");
        move.keyCode = 35;
        move.which = 35;
        $(window).trigger(move);
    }

    document.addEventListener("keydown", function () {
        if (main() == true) {
            moveEnd();
        }
    })
    
    document.addEventListener("click", function () {
        if (main() == true) {
            moveEnd();
        }
    })

})();
