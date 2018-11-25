const axios = require('axios')


// let url = 'http://test.taolu.cloud:3001/graphql'
let url = 'http://127.0.0.1:3001/graphql'

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

export async function  getNodes(jwt) {
  let response = await axios.post(url, {
    query: `
      query{nodesList { id type info {title port host method obfs obfsParam proto protoParam password}}}
    `
  },
  {
    headers: { Authorization: "Bearer " + jwt }
  }
  )
  console.log(response, "getNodes function")
  return response
}


export async function getSubscribes(params) {
  let response = await axios.post(url, {
    query: `
    mutation{ getAllNodes(urlKey: "${params}")}
      `
  })
  return response
}

export async function modifyNode(id, node, jwt) {
  console.log(node.title, node)
  let response = await axios.post(url, {
    query: `
    mutation{ modifyNode(nodeID: ${id}, nodeInfo: {obfsParam : "${node.obfsParam}", title: "${node.title}", 
    host : "${node.host}", method: "${node.method}", flag : "${node.flag}", obfs: "${node.obfs}", protoParam : "${node.protoParam}" ,port: ${node.port}, proto : "${node.proto}", password: "${node.password}"})  { TF Message}}
      `
  },
  {
    headers: { Authorization: "Bearer " + jwt }
  })
  return response
}

export async function deleteNode(id, jwt) {
   console.log(id, jwt) 
   let response = await axios.post(url, {
    query: `
    mutation{ deleteNode(nodeID: ${id})  { TF Message}}
      `
  },
  {
    headers: { Authorization: "Bearer " + jwt }
  })
  return response
}