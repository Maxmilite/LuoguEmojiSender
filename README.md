# LuoguEmojiSender

A TamperMonkey addon which can help you send QQ emoji conveniently.

一款可以帮助您在洛谷犇犇、讨论区快速发送QQ表情的插件。

GreasyFork 地址：[https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender](https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender)

演示视频地址：[https://www.bilibili.com/video/BV11v411G7wX/](https://www.bilibili.com/video/BV11v411G7wX/)

该插件适用于洛谷犇犇和讨论区。

感谢以下贡献者：
    [洛谷: 犇犇犇犇](https://www.luogu.com.cn/user/35998)

# 0. 前言

**已更新完整体最终更新，我已经做到了任何我能想到的需求。**

作者在高二，可能无法及时处理 issue，请见谅。

其实不需要写什么说明了，东西比较简单。

使用比较方便，上手难度极低。

1.1 更新内容：优化操作逻辑，增加用户配置区。

1.2 更新内容：增加了更多的 QQ 图片，更改了图床（感谢 [洛谷: 犇犇犇犇](https://www.luogu.com.cn/user/35998) 的贡献）；优化函数逻辑。

1.3 更新内容：进一步优化操作逻辑，修复了图片加载的一个BUG，现在可以无忧无虑使用无缝模式了。

1.3.1 更新内容：紧急修复一个由菜刀表情引发的严重BUG。

1.4 最终更新 更新内容：修复了 1.3.1 版本更新日志版本号的bug，修复输入问题，修复光标漂移问题，修复无缝衔接问题，修复菜刀表情问题，修复若干问题。

# 1. 使用方法

## 0. 安装 Tampermonkey

对于不同浏览器安装方式不同，请自行百度。

## 1. 在 GreasyFork 安装插件

GreasyFork 地址：[https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender](https://greasyfork.org/zh-CN/scripts/426868-luoguemojisender)

## 2. 开始尽情使用

使用方法 (以默认配置为例)：在犇犇发送区或者讨论区发送区键入这种格式的内容：`{/XX}`

此处的 "XX" 可替换为QQ的常见表情，譬如 "qq" "kk" 等。

之后进行任意一个操作 (包括点击鼠标，敲击键盘等)，上述格式内容就会自动被替换为表情。

目前总共支持 171 种表情，支持的表情在这篇文章中：    [https://www.luogu.com.cn/blog/12cow/qq-biao-qing-ku](https://www.luogu.com.cn/blog/12cow/qq-biao-qing-ku)。

如果您有意愿对表情进行补充，请直接发表 issue 或 pull request，我会进行处理并将您列入贡献者名单，不胜感激。

## 3. 个性化设置

在脚本文件里讲的很详细了，在此不予多进行解释。

如果您将前后缀设置成如下格式：
```javascript
const prefix = "", suffix = "";
```
那么您将可以得到最无缝的体验——输入对应表情代码直接出表情，和QQ的操作基本一致。

