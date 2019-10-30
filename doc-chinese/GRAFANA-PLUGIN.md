## grafana插件开发
grafana插件有三种类型`Panel`, `Data Source`, `App`, 官方提供了很多插件提供下载,当然也可以自己开发一些插件。此篇文档主要针对与开发插件。
### 开发插件的方式
开发插件的方式有三种
1. 设置好grafana开发环境,将你开发的插件放到data/plugins文件夹下
2. 下载安装grafana将你的插件放到配置文件中插件路径中， 默认在linux系统下是`/var/lib/grafana/plugins`
3. 在任意的地方放置你的插件并开发，然后修改配置文件，新增一个grafana.ini文件或者在custom.ini中找到`plugins` 比如：`plugins = E:/other/gplugins`
### 插件开发
可以从官方的github仓库中克隆`simple-react-panel`作为插件开发的基础模板, [github地址](https://github.com/grafana/simple-react-panel)
#### 插件的事件函数
插件可以挂载一些事件：
事件名称 | 用途
-|-
init-edit-mode | 在编辑面板的时候可以用于添加选项卡
panel-teardown | 可用于清理
data-received | 是一个事件，在刷线数据时触发该事件
data-snapshot-load | 是在快照模式下触发以加载数据的事件
data-error | 用于处理仪表盘刷新时的错误
#### React开发插件
##### React开发插件示例
此处举一个Echarts图表插件为例， 插件地址在[公司内部gitlab地址](http://rj.zzx1983.com:30166/zzx-web-group/react/zzx-echarts-panel.git)。
插件开发必须包含的文件有：
#### angular开发插件

