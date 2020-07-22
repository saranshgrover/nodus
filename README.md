# Nodus

Nodus is a competition and event management tool for sporting events like speedcubing. It is integreated with both [WCA](https://worldcubeassociation.org) and [WCA Live](https://live.worldcubeassociation.org) and offers many features for both organizers and competitors like:

- Live notifications for groups and results
- Group and schedule management during the event
- Live customizable projector

It is a Progressive Web Application and is instantly accessible and installable on all devices.

## Development

### Server

Nodus uses a MongoDB/GraphQL/Express backend written entirely in typescript. We use TypeGraphql and Typegoose to manage types and Apollo for our GraphQL server.

To start the server:

```js
cd server
yarn install
yarn start:dev
```

### Client

The client is a React Application built with Apollo Client for GraphQL and Material-UI as our design system. We use graphql-codegen to automatically generate types for our GraphQL types. A majority of the app is written in typescript, and we're working on making it 100% typescript.

To start the client:

```js
cd client
yarn install
yarn start
```

In addition, to watch for changes with mutations and update types automatically, you can run `yarn watch-gen-type`

## Built With

- [React](https://www.reactjs.org)
- [Material UI](https://www.material-ui.com)
- Express
- GraphQL

## Contributing

- Commit Message Syntax:

  - Use [Conventional Commit Syntax](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification)
  - Use [Gitmoji Emoji Syntax](https://gitmoji.carloscuesta.me/) (optional)

This is still currently under development - so if you are interestred in contributing, send me an [email](mailto:saransh.grover@stonybrook.edu).

## Authors

- **Saransh Grover** - [saranshgrover](https://saranshgrover.com)
- **Isaiah Galarza** - [IsaiahGz](https://github.com/isaiahgz)

See also the list of [contributors](https://github.com/nodus/graphs/contributors) who participated in this project.

## License

## Acknowledgments
