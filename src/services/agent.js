import request from '../utils/request';
import ajax from 'ajax-request'

export default {
  getAgents(param) {
    let api = '/api/agents'
    if (param && param.type) {
      switch (param.type) {
        case 'Virtual':
        case 'Physical':
        api =`/api/agents?type=${param.type.toLowerCase()}`
          break;
        default:
          break;
      }
    }
    return request(api, param)
  },
  updateAgent(p){
    let param = {}
    let api = `/api/agents/${p.id}`
    param.method = 'PUT'
    param.data = p
    param.url = api
    ajax(param,function(err, res, body){
      console.log(err)
      console.log(res)
      console.log(body)
    })
  }
}
