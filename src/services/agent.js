import request from '../utils/request';

export default {
  getAgents(param) {
    let api = '/api/agents'
    if (param && param.type) {
      switch (param.type) {
        case 'Virtual':
        api ='/api/v-agents'
          break;
        case 'Physical':
        api = '/api/p-agents'
          break;
        default:
          break;
      }
    }
    return request(api, param)

  }
}
