import App from '@/app';
import AcronymRoute from '@routes/acronyms.route';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AcronymRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
