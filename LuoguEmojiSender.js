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
    // 样例：" "/亲亲": "![](![/qq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qq.gif))", "
    const userElement = {

    }
    
    // -------------------------上方为用户修改配置区--------------------------------

    // 1.1 更新内容：
    // 优化操作逻辑，增加用户配置区
    // 1.2 更新内容：
    // 增加了更多的 QQ 图片，更改了图床

    const replaceElement = {
        "/aini": "![/aini](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/aini.gif)",
        "/aiq": "![/aiq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/aiq.gif)",
        "/am": "![/am](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/am.gif)",
        "/azgc": "![/azgc](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/azgc.gif)",
        "/baiy": "![/baiy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/baiy.gif)",
        "/bangbangt": "![/bangbangt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bangbangt.gif)",
        "/banzz": "![/banzz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/banzz.gif)",
        "/baojin": "![/baojin](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/baojin.gif)",
        "/bb": "![/bb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bb.gif)",
        "/bkx": "![/bkx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bkx.gif)",
        "/bl": "![/bl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bl.gif)",
        "/bobo": "![/bobo](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bobo.gif)",
        "/bp": "![/bp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bp.gif)",
        "/bq": "![/bq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bq.gif)",
        "/bs": "![/bs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bs.gif)",
        "/bt": "![/bt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bt.gif)",
        "/bu": "![/bu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bu.gif)",
        "/bz": "![/bz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/bz.gif)",
        "/cd": "![/cd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cd.gif)",
        "/cengyiceng": "![/cengyiceng](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cengyiceng.gif)",
        "/cg": "![/cg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cg.gif)",
        "/ch": "![/ch](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ch.gif)",
        "/chi": "![/chi](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/chi.gif)",
        "/cj": "![/cj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cj.gif)",
        "/cp": "![/cp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cp.gif)",
        "/cs": "![/cs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cs.gif)",
        "/cy": "![/cy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/cy.gif)",
        "/dan": "![/dan](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dan.gif)",
        "/dao": "![/dao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dao.gif)",
        "/db": "![/db](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/db.gif)",
        "/dg": "![/dg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dg.gif)",
        "/dgg": "![/dgg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dgg.gif)",
        "/dk": "![/dk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dk.gif)",
        "/dl": "![/dl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dl.gif)",
        "/doge": "![/doge](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/doge.gif)",
        "/dx": "![/dx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dx.gif)",
        "/dy": "![/dy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dy.gif)",
        "/dz": "![/dz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/dz.gif)",
        "/ee": "![/ee](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ee.gif)",
        "/emm": "![/emm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/emm.gif)",
        "/fad": "![/fad](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fad.gif)",
        "/fade": "![/fade](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fade.gif)",
        "/fan": "![/fan](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fan.gif)",
        "/fd": "![/fd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fd.gif)",
        "/fendou": "![/fendou](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fendou.gif)",
        "/fj": "![/fj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fj.gif)",
        "/fn": "![/fn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fn.gif)",
        "/fw": "![/fw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/fw.gif)",
        "/gg": "![/gg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gg.gif)",
        "/gy": "![/gy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gy.gif)",
        "/gz": "![/gz](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/gz.gif)",
        "/hanx": "![/hanx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hanx.gif)",
        "/haob": "![/haob](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/haob.gif)",
        "/hb": "![/hb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hb.gif)",
        "/hc": "![/hc](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hc.gif)",
        "/hd": "![/hd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hd.gif)",
        "/hec": "![/hec](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hec.gif)",
        "/hhd": "![/hhd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hhd.gif)",
        "/hn": "![/hn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hn.gif)",
        "/hp": "![/hp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hp.gif)",
        "/hq": "![/hq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hq.gif)",
        "/hsh": "![/hsh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hsh.gif)",
        "/ht": "![/ht](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ht.gif)",
        "/huaix": "![/huaix](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/huaix.gif)",
        "/hx": "![/hx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/hx.gif)",
        "/jd": "![/jd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jd.gif)",
        "/jh": "![/jh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jh.gif)",
        "/jiaybb": "![/jiaybb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jiaybb.gif)",
        "/jiaybs": "![/jiaybs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jiaybs.gif)",
        "/jie": "![/jie](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jie.gif)",
        "/jk": "![/jk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jk.gif)",
        "/jw": "![/jw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jw.gif)",
        "/jx": "![/jx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/jx.gif)",
        "/ka": "![/ka](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ka.gif)",
        "/kb": "![/kb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kb.gif)",
        "/kel": "![/kel](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kel.gif)",
        "/kf": "![/kf](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kf.gif)",
        "/kg": "![/kg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kg.gif)",
        "/kk": "![/kk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kk.gif)",
        "/kl": "![/kl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kl.gif)",
        "/kt": "![/kt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kt.gif)",
        "/kuk": "![/kuk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kuk.gif)",
        "/kun": "![/kun](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kun.gif)",
        "/kzht": "![/kzht](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/kzht.gif)",
        "/lb": "![/lb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lb.gif)",
        "/lengh": "![/lengh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lengh.gif)",
        "/lh": "![/lh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lh.gif)",
        "/ll": "![/ll](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ll.gif)",
        "/lm": "![/lm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lm.gif)",
        "/lq": "![/lq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lq.gif)",
        "/lw": "![/lw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lw.gif)",
        "/lyj": "![/lyj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/lyj.gif)",
        "/mdfq": "![/mdfq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mdfq.gif)",
        "/mg": "![/mg](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mg.gif)",
        "/mm": "![/mm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/mm.gif)",
        "/ng": "![/ng](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ng.gif)",
        "/nkt": "![/nkt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/nkt.gif)",
        "/oh": "![/oh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/oh.gif)",
        "/oy": "![/oy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/oy.gif)",
        "/pch": "![/pch](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pch.gif)",
        "/pj": "![/pj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pj.gif)",
        "/pp": "![/pp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pp.gif)",
        "/pt": "![/pt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/pt.gif)",
        "/px": "![/px](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/px.gif)",
        "/qd": "![/qd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qd.gif)",
        "/qiang": "![/qiang](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qiang.gif)",
        "/qiao": "![/qiao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qiao.gif)",
        "/qq": "![/qq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qq.gif)",
        "/qt": "![/qt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/qt.gif)",
        "/ruo": "![/ruo](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ruo.gif)",
        "/sa": "![/sa](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sa.gif)",
        "/se": "![/se](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/se.gif)",
        "/sh": "![/sh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sh.gif)",
        "/shd": "![/shd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shd.gif)",
        "/shl": "![/shl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shl.gif)",
        "/shuai": "![/shuai](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shuai.gif)",
        "/shui": "![/shui](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shui.gif)",
        "/shxi": "![/shxi](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/shxi.gif)",
        "/sr": "![/sr](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/sr.gif)",
        "/tiao": "![/tiao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tiao.gif)",
        "/tl": "![/tl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tl.gif)",
        "/tnl": "![/tnl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tnl.gif)",
        "/tp": "![/tp](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tp.gif)",
        "/ts": "![/ts](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ts.gif)",
        "/tsh": "![/tsh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tsh.gif)",
        "/tt": "![/tt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tt.gif)",
        "/tuu": "![/tuu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tuu.gif)",
        "/tx": "![/tx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tx.gif)",
        "/ty": "![/ty](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ty.gif)",
        "/tyt": "![/tyt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/tyt.gif)",
        "/wbk": "![/wbk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wbk.gif)",
        "/whl": "![/whl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/whl.gif)",
        "/wl": "![/wl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wl.gif)",
        "/wn": "![/wn](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wn.gif)",
        "/wosl": "![/wosl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wosl.gif)",
        "/wq": "![/wq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wq.gif)",
        "/ws": "![/ws](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/ws.gif)",
        "/wul": "![/wul](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wul.gif)",
        "/wx": "![/wx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wx.gif)",
        "/wzm": "![/wzm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/wzm.gif)",
        "/xhx": "![/xhx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xhx.gif)",
        "/xia": "![/xia](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xia.gif)",
        "/xig": "![/xig](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xig.gif)",
        "/xin": "![/xin](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xin.gif)",
        "/xjj": "![/xjj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xjj.gif)",
        "/xk": "![/xk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xk.gif)",
        "/xs": "![/xs](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xs.gif)",
        "/xu": "![/xu](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xu.gif)",
        "/xw": "![/xw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xw.gif)",
        "/xy": "![/xy](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xy.gif)",
        "/xyx": "![/xyx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/xyx.gif)",
        "/yao": "![/yao](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yao.gif)",
        "/yb": "![/yb](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yb.gif)",
        "/yhh": "![/yhh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yhh.gif)",
        "/yiw": "![/yiw](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yiw.gif)",
        "/yl": "![/yl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yl.gif)",
        "/youl": "![/youl](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/youl.gif)",
        "/youtj": "![/youtj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/youtj.gif)",
        "/yt": "![/yt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yt.gif)",
        "/yun": "![/yun](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yun.gif)",
        "/yx": "![/yx](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/yx.gif)",
        "/zhd": "![/zhd](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhd.gif)",
        "/zhem": "![/zhem](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhem.gif)",
        "/zhh": "![/zhh](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhh.gif)",
        "/zhm": "![/zhm](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhm.gif)",
        "/zhq": "![/zhq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zhq.gif)",
        "/zj": "![/zj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zj.gif)",
        "/zk": "![/zk](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zk.gif)",
        "/zq": "![/zq](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zq.gif)",
        "/zt": "![/zt](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zt.gif)",
        "/zuotj": "![/zuotj](https://cdn.jsdelivr.net/gh/4bqwq/LuoguEmojiSender@main/image/zuotj.gif)"
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
