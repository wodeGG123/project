import user from './user'
import config from './config'

export default (app)=>{
    app.model(user);
    app.model(config);
}