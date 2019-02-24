const axios = require('axios')


let url = 'https://api.sebs.club/graphql'
// let url = 'http://192.168.50.216:3001/graphql'

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

export async function addNode(node, type, jwt) {
  let nodeInfo = {}
  if( type == 'SSR'){
    nodeInfo = `{ obfsParam : "${node.obfsParam}", title: "${node.title}", 
     host : "${node.host}", method: "${node.method}", flag : "${node.flag}", obfs: "${node.obfs}", protoParam : "${node.protoParam}" ,port: ${node.port}, proto : "${node.proto}", password: "${node.password}"}`
     let response = await axios.post(url, {
      query: `
      mutation{ addNode(type: ${type}, nodeInfo: ${nodeInfo} )  { TF Message}}
      `
    },
    {
      headers: { Authorization: "Bearer " + jwt }
    }
    ) 
    return response
  } 
  if(type == 'V2RAY') {
     nodeInfo = `{
      add: "${node.add}",
      ps: "${node.ps}",
      port: "${node.port}",
      aid: "${node.aid}",
      host: "${node.host}",
      id: "${node.id}",
      method: "${node.method}",
      net: "${node.net}",
      path: "${node.path}",
      tls: "${node.tls}",
      type: "${node.type}"
     }`
     let response = await axios.post(url, {
      query: `
      mutation{ addV2rayNode(type: ${type}, nodeInfo: ${nodeInfo} )  { TF Message}}
      `
    },
    {
      headers: { Authorization: "Bearer " + jwt }
    }
    ) 
    return response
  }
 
}

export async function  getNodes(jwt) {
  let response = {}
  try {
     response = await axios.post(url, {
      query: `
        query{nodesList { id type info { add ps aid id net path tls type title port host method obfs obfsParam proto protoParam password }}}
      `
    },
    {
      headers: { Authorization: "Bearer " + jwt }
    }
    )
  } catch (e) {
    response = e.response
  }
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

export async function modifyNode(id, type, node, jwt) {
  let nodeInfo = {}
  if( type == 'SSR'){
    nodeInfo = `{ obfsParam : "${node.obfsParam}", title: "${node.title}", 
    host : "${node.host}", method: "${node.method}", flag : "${node.flag}", obfs: "${node.obfs}", protoParam : "${node.protoParam}" ,port: ${node.port}, proto : "${node.proto}", password: "${node.password}"}`
    let response = await axios.post(url, {
      query: `
      mutation{ modifyNode(nodeID: ${id}, nodeInfo: ${nodeInfo} )  { TF Message}}
        `
    },
    {
      headers: { Authorization: "Bearer " + jwt }
    })
    return response
  }
  if( type == 'V2RAY') {
    nodeInfo = `{
      add: "${node.add}",
      ps: "${node.ps}",
      port: "${node.port}",
      aid: "${node.aid}",
      host: "${node.host}",
      id: "${node.id}",
      method: "${node.method}",
      net: "${node.net}",
      path: "${node.path}",
      tls: "${node.tls}",
      type: "${node.type}"
     }`
     let response = await axios.post(url, {
      query: `
      mutation{ modifyV2rayNode(nodeID: ${id}, nodeInfo: ${nodeInfo} )  { TF Message}}
        `
    },
    {
      headers: { Authorization: "Bearer " + jwt }
    })
    return response
  }

} 
  

export async function deleteNode(id, jwt) {
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