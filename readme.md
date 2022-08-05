# 代码生成工具【code generate tool】

学习怎么写命令行工具，封装的玩具，当然是抄了其他cli项目与社区文档。

## 支持的命令

命令行工具, 支持以下命令:

### cgt create  克隆远程仓库到本地

封装了`download-git-repo`

 *[X] 下载模板仓库 cgt create [options] <template> <app-name>
 The shorthand repository string to download the repository from:

GitHub - github:owner/name or simply owner/name
GitLab - gitlab:owner/name
Bitbucket - bitbucket:owner/name

```cmd
cgt create startup
```

也可以直接运行命令,根据提示输入

```
cgt create 
```



### cgt add [pakage name] 添加项目依赖  

使用`execa` 执行本地的npm 命令

【鸡肋，但需要添加 @Schematics/ ，对其封装】

需要装填需要 schematic 依赖

例如：

```cmd
cgt add @nestjs/schematics
```

![image-20220805194042532](https://picgo1-1300491698.cos.ap-nanjing.myqcloud.com//image-20220805194042532.png)


### cgt create  [schematic]  :star:

封装了工具 `@angular-devkit/schematics-cli`

运行生成代码

例如：

```js
cgt g class cat
```



## 期望

预计的定位，自己开发中常用到的功能。
例如：
    1.拷贝git 远程仓库模板
    2.生成 模板代码
      测试代码
      组件代码
      根据json数据生成响应代码
    3.配置开发环境
       一键安装vscode插件
       开发环境插件