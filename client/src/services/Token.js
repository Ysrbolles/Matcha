import Api from '@/services/Api'

export default {
  createToken (data) {
    return new Promise((resolve, reject) => {
      Api().post('/token/', {'data': data})
        .then(success => { resolve(success) })
        .catch(error => { reject(error) })
    })
  },
  destroyToken (token) {
    return new Promise((resolve, reject) => {
      Api().del('/token/', token)
        .then(success => { resolve(success) })
        .catch(error => { reject(error) })
    })
  },
  decodeToken (token) {
    return new Promise((resolve, reject) => {

      Api().get('/token', token)
        .then(success => {
          resolve(success) })
        .catch(error => {
          reject(error) })
    })
  }
}
