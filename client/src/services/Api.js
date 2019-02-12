import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:3000/`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    }
  })
}
