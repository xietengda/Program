import dva from 'dva';
import './index.css';

//修改不使用哈希路由访问
import {createBrowserHistory as createHistory} from 'history';
// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 1. Initialize
// const app = dva();

// 2. Plugins
// app.use({});

// 3. 引入Model
app.model(require('./models/indexTest').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
