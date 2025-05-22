// src/server.ts
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { buildSubgraphSchema } = require('@apollo/subgraph')
const gql = require('graphql-tag')
const fs = require('fs')
const path = require('path')


const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'))

const valueDefs = [
    { id: '1', name: 'Temperature', type: 'float' },
    { id: '2', name: 'Pressure', type: 'int' },
    { id: '3', name: 'Humidity', type: 'float' },
    { id: '4', name: 'Voltage', type: 'float' },
    { id: '5', name: 'Current', type: 'float' },
    { id: '6', name: 'Speed', type: 'float' },
    { id: '7', name: 'Vibration', type: 'float' },
    { id: '8', name: 'FlowRate', type: 'float' },
    { id: '9', name: 'Torque', type: 'float' },
    { id: '10', name: 'Power', type: 'float' },
    { id: '11', name: 'Energy', type: 'float' },
    { id: '12', name: 'Frequency', type: 'float' },
    { id: '13', name: 'SignalStrength', type: 'int' },
    { id: '14', name: 'NoiseLevel', type: 'float' },
    { id: '15', name: 'BatteryLevel', type: 'int' },
    { id: '16', name: 'LightIntensity', type: 'float' },
    { id: '17', name: 'Proximity', type: 'int' },
    { id: '18', name: 'CO2', type: 'float' },
    { id: '19', name: 'SoundLevel', type: 'float' },
    { id: '20', name: 'WaterLevel', type: 'float' }
]


/** @type {import('./generated/graphql').Resolvers} */
const resolvers = {
    Query: {
        getValueDefById: (_: unknown, { id }: { id: string }) => {
            return valueDefs.find(v => v.id === id) || null
        },
        listValueDefs: () => valueDefs
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
