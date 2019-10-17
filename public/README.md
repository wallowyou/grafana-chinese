## grafana源码构建和汉化
### grafana源码构建官方文档补充
> 官方源码构建文档 [点击查看](https://grafana.com/docs/project/building_from_source/)，此版本为6.4  

1. 关于gcc编译可以下载[点击下载](https://managedway.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/4.8.2/threads-posix/seh/x86_64-4.8.2-release-posix-seh-rt_v3-rev2.7z),下载解压之后将bin加入到环境变量系统变量Path中。这个版本解决有可能出现的64位无法编译的问题。
2. 关于`go run build.go setup`、`go run build.go build `执行成功之后在bin下面生成一个文件夹`windows-amd64`, 运行里面的grafana-server.exe，并不成功，需要将里面四个文件移到bin文件夹中。
3. 关于`yarn install --pure-lockfile`前端安装失败或者时间太长,可以切换到淘宝镜像
`yarn config set registry https://registry.npm.taobao.org`
### grafana汉化  

前提条件是已经搭建好了源码构建的环境并且能够启动的服务，此汉化并没有加i8n而是直接修改源代码
#### 前端部分汉化  

大部分汉化工作都是直接修改前端部分的代码即可，但是有一些提醒信息是后台返回的，还有就是左侧导航栏和部分模块页的头部信息也是后台固定写死的。
前端部分的汉化可以分以下几个部分。前端部分修改`public下面的文件`
1. 页面级的汉化（dashboard, explore, alert, config, serve Admin）
2. 功能模块的汉化 （panel, folder等）
3. 模态框的汉化
4. 插件的汉化 （graph ,singledata, heatmap等）

#### 后台部分汉化
后台部分修改`pkg/api`文件夹下面的go文件, 修改之后后台重新构建。