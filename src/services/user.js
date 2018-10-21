import request from '../utils/request';

export default {
  getUserInfo(param){return request('/api/userInfo',param)}
}
