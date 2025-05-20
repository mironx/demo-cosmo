// src/server.ts
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { buildSubgraphSchema } = require('@apollo/subgraph')
const gql = require('graphql-tag')
const fs = require('fs')
const path = require('path')


const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'))

/** @type {import('./generated/graphql').Resolvers} */
const resolvers = {
    Query: {
        getValueDefById: (_: unknown, { id }: { id: string }) => {
            return { id, name: 'abc', type: 'int' }
        }
        ,
        listValueDefs: () => [{ id: '1', name: 'x', type: 'string' }]
    }
}

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers: resolvers as any
    })
})

startStandaloneServer(server, {
    listen: { port: 4002 }
}).then(({ url }: { url: string }) => {
    console.log(`🚀 Subgraph ready at ${url}`)
})
