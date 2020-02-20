import axios from 'axios'

export default () => {
  const data = { baseURL: 'http://localhost:4242' }
  const auth = {
    token: localStorage.getItem('authToken'),
  }
  if (auth.token) {
    Object.assign(data, {
      headers: { "Authorization": `Bearer ${auth.token}` }
    })
  } else {
    localStorage.removeItem('authToken')

  }
  return axios.create(data)
}
