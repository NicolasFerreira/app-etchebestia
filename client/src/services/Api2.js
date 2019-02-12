export default(method, route, data) => {
  const urlBase = `http://localhost:3000/`
  const otherParams = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    },
    body: data,
    method: method,
    mode: 'cors'
  }
  const url = `${urlBase}${route}`
  return fetch(url, otherParams)
    .then(data => data.json())
    .then(response => response)
    .catch(error => error)
}
