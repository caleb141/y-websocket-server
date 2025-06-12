#!/usr/bin/env node

import WebSocket from 'ws'
import http from 'http'
import * as number from 'lib0/number'
import { setupWSConnection } from './utils.js'

const wss = new WebSocket.Server({ noServer: true })

// ✅ Removed host binding
const port = number.parseInt(process.env.PORT || '1234')

const server = http.createServer((_request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('okay')
})

wss.on('connection', setupWSConnection)

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request)
  })
})

// ✅ Listen on all interfaces
server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`)
})
