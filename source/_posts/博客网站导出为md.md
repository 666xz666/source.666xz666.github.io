---
categories:
- 博客搭建
cover: /images/posts/image-20250117213456319.png
date: 2025-01-17 21:14:43
index_img: /images/posts/image-20250117213456319.png
tags:
- markdown
- tool
- CSDN
title: 博客文章导出为md
---

# 博客文章导出为md

## 为什么要弄这个

由于博客文章内容是基于静态的md文件，我想找一个方法将发在CSDN上的文章全部导进来，结果我看到了这篇文章：

[CSDN、掘金、简书博客文章如何转为Markdown?_csdn文章转markdown-CSDN博客](https://blog.csdn.net/weixin_45871977/article/details/143170311)

## 操作步骤

步骤很简单，就是浏览器打开文章页面，f12开发者模式，复制

`“article_content”`一整个标签内容为outer HTML，然后打开下面网站：

[markdown编辑器 - 在线工具](https://tool.lu/markdown/)

导入后即可下载md文件到本地。

## 实操结果

> 
>
>参考内容：[CSDN、掘金、简书博客文章如何转为Markdown?](https://blog.csdn.net/Better_Xing/article/details/125246147)
>
>> 下面以CSDN博文为例
>
>**1.在CSDN博文页面点击右键，选择“检查”（Google浏览器为例）。**  
>![在这里插入图片描述](/images/posts/1f1e6432db987d3471c8113139bee121.png)
>
>**2.在查看器中搜索“article_content”，找到对应内容，点击…复制为outerHTML。**  
>![在这里插入图片描述](/images/posts/63c5a8638ca7b40d4a70098b7ccb37a4.png)  
>![在这里插入图片描述](/images/posts/cac221099996ce477d0bbe1847d81523.png)  
>**3.打开网址https://tool.lu/markdown/，点击HTML2MD，粘贴html代码，转换成Markdown。**  
>![在这里插入图片描述](/images/posts/e80f4a75e11b62d5a03fe7888b5c6810.png)  
>**4.大功告成，同理操作掘金、简书或其他平台上博客，可能不在是article_content，需要自己找下博客主体内容。**  
>![在这里插入图片描述](/images/posts/275c5c0043dfdcc81e905d1cebc22702.png)
>
>

直接把原文拿过来了，有种套娃的美。:sweat_smile:

