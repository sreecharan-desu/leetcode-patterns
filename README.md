# leetcode-patterns

leetcode-style judge skeleton: an api that queues submissions in redis, a worker that pops them, and a websocket server.

## features

- `POST /submit` pushes `{ userId, problemId, code }` onto a redis list (`leetcode-clone/primary-backend`)
- worker blocks on `brPop` and processes submissions (`leetcode-clone/worker`)
- websocket server on :8080 (`websocket-server`)

## stack

express 5 · redis · ws · typescript

## run locally

needs a local redis on the default port.

```bash
cd leetcode-clone/primary-backend && npm install && npx tsx src/index.ts
cd leetcode-clone/worker && npm install && npx tsx src/index.ts
cd websocket-server && npm install && npm run build && npm start
```

## env

none.
