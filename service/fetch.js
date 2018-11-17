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

export async function addNode(node, jwt) {
  console.log(jwt, "jwtttttttttttttttttttttttttttttttttttttttttttttt")
  let response = await axios.post(url, {
    query: `
    mutation{ addNode(type: SSR, nodeInfo: { obfsParam : "${node.obfsParam}", title: "${node.title}", 
     host : "${node.host}", method: "${node.method}", flag : "${node.flag}", obfs: "${node.obfs}", protoParam : "${node.protoParam}" ,port: ${node.port}, proto : "${node.proto}", password: "${node.password}"})  { TF Message}}
    `
  },
  {
    headers: { Authorization: "Bearer " + jwt }
  }
  )
  console.log(response, "12312312312312312")
  return response
}
