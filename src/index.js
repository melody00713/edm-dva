import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.less';

// 1. Initialize
const app = dva({
  onError(e) {
    message.error(e.message, 3);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/users'));
app.model(require("./models/login"));
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
