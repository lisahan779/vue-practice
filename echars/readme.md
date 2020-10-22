## echars学习

### 文件基于vue的echarts练习

eckarts_open_class 文件夹是原生的使用方式
cms-guizhouprovice 是vue改写版练习


### 第一步，下载echarts

    cnpm install echarts --save-dev

### 第二步，在main.js中全局引入
```
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```
### 第三步，建立echarts组件
首先引入echarts
其次引入地图组件

```javascript
  import echarts from "echarts";
  //import '../../node_modules/echarts/map/js/world.js'
  import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
```

### bug:ECharts is not Loaded

bug描述：
用echarts.js和china.js配置地图，结果显示不正常，打开浏览器后台，显示以上报错。

 bug解决过程：
原因是在加载echarts.js前加载的china.js,这两个js文件加载顺序是需要注意的，必须先加载echarts.js才能加载其它的地图组件。


echarts使用技巧（一）echarts的图表自适应resize问题、单选、缩放等

```javascript
  let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize; //监听echarts的图表样式变化
```