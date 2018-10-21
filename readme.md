#thoughtWorks homeWork

#开发框架：react dva

#mock数据，修改webpack配置，设置proxy，dev的时候解决跨域请求问题
#api:为了满足demo一些展示需求，自己新增了一些api，例如userinfo、p-agents、v-agents。
#字体图标：由于素材不够，自己根据需求添加了awesome字体图标
#react-router  component children router
#react-router withRouter
#react-router redirect

#使用深拷贝lodash cloneDeep
#原生滚动条样式不好看改用了iscroll

#主体色：使用sass的变量特性，所有组件以及页面都使用公有的颜色变量，这样替换主题色只需要修改theme中的sass颜色变量即可

#有疑问的地方
#黄色块的颜色值对应不上 提示：FF9A2A，取色：#ffb900
#齿轮2s转一圈，感觉太快了
#三个模块的宽度两张图不一样，设计图是270px，拆分图是234px, 个人审美观取设计图的尺寸
#新增resources的pop组件监听点击事件，自己写了一个获取所有父辈节点的方法（utils/dom.js）来判断是否点击到pop对象

#遇到的难点
#问题：组件内部路由变化，但是组件的children没有发生改变
#原因：由于react监听机制问题
#解决：需要在父组件出口加入withrouter方法（通过内部componentWillReceiveProps也可以解决，不过使用目前方法更便捷）

#问题：当agent页面更新list的时候 render层没有刷新到最新数据
#原因：由于在公共组件agentBlock里面设置的this.state.data = this.props.data 是初始化的时候设置的，但是由于react对比检测，此组件是没有重置，所以不会走construtor方法。
#解决：要在此组件内写componentWillReceiveProps这个方法监听props的改变，重置state
#ps:本来是可以直接使用props属性作为render参数的，但是涉及到改变内容，react规定最好不要在组件内改变props，这样会破坏父组件的数据

#问题：pop组件弹出后，点击pop以外的地方自动关闭pop，在给pop组件添加click监听事件后，触发事件作用域变了，并且添加监听不能传参，导致无法使用this调用对象内部方法
#原因：click事件的作用域是作用于当前点击的对象
#解决：通过bind包裹事件，把包裹后的返回值传给state的一个属性，然后添加监听click传入的事件是这个state的属性，那么在函数内部的this就是通过bind后的this。（主要内容就是bind方法的实现）

#问题：使用mocha单元测试的时候，不能使用import
#原因：mocha是nodejs写的，不支持es6
#解决：执行命令之前先使用babel转码 package.json -> scripts -> "test": "mocha --require babel-core/register ./test/setup.js"

#单元测试：
#框架：mocha、jsdom
#测试内容：主要测试查找dom对象的所有父节点

#还需要做的：
#3、高阶组件