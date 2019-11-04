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
1. `plugin.json`, 描述插件的问价
```
{
  "type": "panel",
  "name": "Echarts Panel",
  "id": "zzx-echarts-panel",

  "info": {
    "description": "Zzx Echarts Panel",
    "author": {
      "name": "wallow"
    },
    "keywords": ["Echarts"],
    "logos": {
      "small": "img/logo_new.svg",
      "large": "img/logo_new.svg"
    },
    "links": [
      {"name": "Website", "url": "https://github.com/grafana/simple-react-panel"},
      {"name": "License", "url": "https://github.com/grafana/simple-react-panel/blob/master/LICENSE"}
    ],
    "screenshots": [],
    "version": "%VERSION%",
    "updated": "%TODAY%"
  },

  "dependencies": {
    "grafanaVersion": "6.3.x",
    "plugins": []
  }
}

```
2. `module.(t|j)s(?x)` ,例如：
```
import { PanelPlugin } from '@grafana/ui';
import { SimpleOptions, defaults } from './types';
import { SimplePanel } from './SimplePanel';
import { SimpleEditor } from './SimpleEditor';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setDefaults(defaults).setEditor(SimpleEditor);
```
3. 关于插件配置中会使用到的一些组件
+ PanelEditorProps
+ FormField
+ FormLabel
+ Select
+ Switch
+ PanelOptionsGrid
+ PanelOptionsGroup
+ ColorPicker
其他所需要的组件需要的时候引入
4. 关于图表接入数据
可以使用`this.props.data`获取到需要的数据列`series`
#### angular开发插件
*TODO*
## 一些插件
### SVG插件
我们在大屏展示的时候可能会用到svg图，grafana官方有一个插件SVG panel for grafana,需要我们手动安装或者直接下载包压缩包,[下载地址](https://codeload.github.com/MarcusCalidus/marcuscalidus-svg-panel/legacy.zip/56d2a0fb2b25f36bf55cfa24baae0fa8c5636dea)。
插件提供的功能有：
1. svg builder 就是可以通过操作自动生成svg。
2. 可以手动输入svg data。
3. 提供Event让你可以自定义编写js代码对svg进行操作
4. 此插件集成了snap.js操作svg

### 数字动画