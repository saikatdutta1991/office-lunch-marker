# Office Lunch Marker Slack App
Listens to `lunch at office` phrase in message and adds :bento: ( bento ) reaction on that on behalf of authorized users.

## To authorize yourself
Type in the command `/auto-opt-me-in` ( in bangalore chanel where the app is added) 

## To de-authorize yourself
Type in the command `/auto-opt-me-in` ( in bangalore channel where the app is added ) 

## Run Locally

### 1. Slack App Configurations

- Create a slack app
- Generate app level token
- Enable socket mode
- Create 2 commands: `/auto-opt-me-in` `/auto-opt-me-out`
- Add redirect url for OAuth `{your-domain}/slack/oauth_redirect`
- Add bot token scopes [`channels:history`, `chat:write`, `commands`, `reactions:write`]
- Add user token scopes [`channels:history`, `chat:write`, `reactions:write`]
- Enable event subscription
- Subscribe to bot events [`message.channels`]
- Subscribe to events on behalf of users [`message.channels`]
- Install your app into workspace


### 2. Env configs
```
SLACK_APP_TOKEN=
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
PORT=3000
REDIS_URL=
BASE_URL=https://office-lunch-marker.herokuapp.com
```

### 3. Install dependencies
`npm install`

### 4. Run locally
`npm run start:dev`


### 5. To test
type `hello` message in the respective channel

## License
Licensed under the MIT License
