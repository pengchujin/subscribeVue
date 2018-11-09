const axios = require('axios')


let url = 'http://localhost:3001/graphql'

export async function signup(username, password) {
  console.log(username, typeof(username), password, typeof(password))
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
  console.log(response.data, "?????????????")
  return response
}
