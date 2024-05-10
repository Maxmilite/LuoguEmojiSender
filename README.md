# 声明

这个项目是我在高中时期自娱自乐编写的。当时工程代码水平有限，代码实现上会有很多纰漏。

目前由于学业压力较大，暂时没有精力继续维护这个项目，因此无法保证该插件可用性，敬请谅解。

相关工作：
- <https://www.luogu.com.cn/article/71oyd36d>

# LuoguEmojiSender

A TamperMonkey addon which can help you send QQ emoji conveniently.

一款可以帮助您在洛谷犇犇、讨论区快速发送QQ表情的插件。

GreasyFork 地址：[https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender](https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender)

演示视频地址：[https://www.bilibili.com/video/BV11v411G7wX/](https://www.bilibili.com/video/BV11v411G7wX/)

该插件适用于洛谷犇犇和讨论区。

感谢以下贡献者：
- [洛谷: 犇犇犇犇](https://www.luogu.com.cn/user/35998)
- [洛谷: yihra1207](https://www.luogu.com.cn/discuss/show/208902)
- [洛谷: WYXkk](https://www.luogu.com.cn/user/130151)

# 0. 前言

**已更新完整体最终更新，我已经做到了任何我能想到的需求。**

作者在高二，可能无法及时处理 issue，请见谅。

其实不需要写什么说明了，东西比较简单。

使用比较方便，上手难度极低。

1.1 更新内容：

- 优化操作逻辑，增加用户配置区。

1.2 更新内容：

- 增加了更多的 QQ 图片，更改了图床（感谢 [洛谷: 犇犇犇犇](https://www.luogu.com.cn/user/35998) 的贡献）
- 优化函数逻辑。

1.3 更新内容：

- 进一步优化操作逻辑，修复了图片加载的一个BUG，现在可以无忧无虑使用无缝模式了。

1.3.1 更新内容：

- 紧急修复一个由菜刀表情引发的严重BUG。

1.4 ~~最终~~更新 更新内容：
- 修复了 1.3.1 版本更新日志版本号的bug，修复输入问题，修复光标漂移问题，修复无缝衔接问题，修复菜刀表情问题，修复若干问题。

1.4.1 增量更新 更新内容：

- 更换表情源，增加 “替换表情” 按钮 

    ![](https://z3.ax1x.com/2021/05/30/2VSGDA.png)

    按下按钮可以替换文中所有的表情符号，弥补了某些不足。

1.4.2 增量更新 更新内容：

- 修复一个无缝模式的 bug，添加了部分表情 表情如下：[https://www.luogu.com.cn/paste/dzor650w](https://www.luogu.com.cn/paste/dzor650w)

1.4.3 增量更新 更新内容：

- 添加雀魂表情，表情如下：

    ![](https://cdn.jsdelivr.net/gh/BoringHacker/cdn/emojis/majsoul/table.png)

    您可以输入 `{/maj-*!}` 来输入雀魂表情。

- 增加了一个开关自动替换按钮，现在您可以自行决定是否自动替换文中内容了。

    ![](https://z3.ax1x.com/2021/06/09/2ye7OP.png)

    修复了部分浏览器显示不正常的一个bug。

1.4.4 增量更新 更新内容：

- 增加设置菜单，现在允许对插件进行有关设置了。所有设置将会保存在本地，不会因为版本更新而丢失。

    ![](https://z3.ax1x.com/2021/06/14/2T6jWF.png)

    请参看 1.3 进行设置。

- 增加 “查看表情” 按钮，位于页面的右边，可由用户自行关闭。

    ![](https://z3.ax1x.com/2021/06/14/2TcbXd.png)

    点击按钮即可进入 LuoguEmojiSender 表情库查询表情。

    ![](https://z3.ax1x.com/2021/06/14/2TggC8.png)

# 1. 使用方法

## 0. 安装 Tampermonkey

对于不同浏览器安装方式不同，请自行百度。

## 1. 在 GreasyFork 安装插件

GreasyFork 地址：[https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender](https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender)

## 2. 开始尽情使用

使用方法 (以默认配置为例)：在犇犇发送区或者讨论区发送区键入这种格式的内容：`{/XX}`

此处的 "XX" 可替换为QQ的常见表情，譬如 "qq" "kk" 等。

之后，上述格式内容就会自动被替换为表情。

目前总共支持 ？？？ 种表情，支持的表情在表情库中：    [https://maxmilite.gitee.io/archive/emoji-library.html](https://maxmilite.gitee.io/archive/emoji-library.html)。

如果您有意愿对表情进行补充，请直接发表 issue 或 pull request，我会进行处理并将您列入贡献者名单，不胜感激。

## 3. 个性化设置

您可以在洛谷主页的最后 “友情链接” 找到插件设置入口，点击即可进行插件设置。

![](https://z3.ax1x.com/2021/06/14/2T6jWF.png) ![](https://z3.ax1x.com/2021/06/14/2Tcdwq.png)

无缝模式支持直接启用，不需要额外配置，自定义前后缀也可直接设置。

查表情按钮可以自行决定开关。

对于用户定义表情，您可以按照 javascript 字典的格式进行输入，格式如下：

```javascript
{
    "/***": "https://******/", 
    "/***": "https://******/"
}
```

请注意每行最后的逗号。

您可以按 “保存” 按钮进行对配置的保存，或者按 “取消” 按钮放弃修改。

您可以点击 “点击重置 LuoguEmojiSender” 字样来进行重置插件。
