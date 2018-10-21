import dva from 'dva';
import models from './models/index'
import './index.scss';
import './assets/font-icons/fonts.css' //引入字体图标
import './assets/font-icons/fonts-es.css' //引入字体图标扩展
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Models
models(app)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
