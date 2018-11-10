const axios = require('axios')


let url = 'http://localhost:3001/graphql'

export async function signup(username, password) {
  let response = await axios.post(url, {
    query: `
      mutation {
        signup(username: "${username}", password: "${password}" ) {
          Message,
          TF
        }
      }
      `
  })
  return response
}

export async function signin(username, password) {
  let response = {}
  try {
     response = await axios.post(url, {
      query: `
      mutation{
        signin(username: "${username}", password: "${password}") {
          jwt
          id
          username
        }
      }
      `
    })
  } catch(e) {
    response = e.response
  }
  return response
}
