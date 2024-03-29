import {json, urlencoded} from 'body-parser';
import cors from 'cors';
import express from 'express';
import {existsSync} from 'fs';
import helmet from 'helmet';
import {createServer} from 'http';
import morgan from 'morgan';
import {join} from 'path';

import './config/dotenv';
import './config/mongoose';
import './config/passport-setup';

import routes from './api/routes';
import routesAuth from './auth/routes';
import {setGraphQLClientAPI} from './api/graphql/routes';
import passport from 'passport';

const app = express();
const server = createServer(app);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
app.get('/favicon.ico', (req, res) => res.sendFile(join(__dirname, 'favicon.ico')));
app.use('/api', routes);
app.use('/auth', routesAuth);

const { graphqlClientPath, graphqlClientSubsPath } = setGraphQLClientAPI(app, server, '/api/graphql');
const clientDirectory = 'public';
const clientDirectoryPath = join(__dirname, '..', clientDirectory);

if (existsSync(clientDirectoryPath)) {
	app.use(express.static(clientDirectoryPath));
	app.get('*', (req, res) => res.sendFile(join(clientDirectoryPath, 'index.html')));
} else {
  console.warn(`[WARNING]: '${ clientDirectory }' directory doesn't exist, only API is available.`);
}

app.use('*', (req, res) => res.sendStatus(404));

const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const baseWsUrl = process.env.BASE_WS_URL;

server.listen(port, () => {
	console.info(`Express server running: ${ baseUrl }:${ port }`);
	console.info(`Server Restful API: ${ baseUrl }:${ port }/api`);
	console.info(`GraphQL Client queries/mutations API: ${ baseUrl }:${ port }${ graphqlClientPath }`);
	console.info(`GraphQL Client subscriptions API: ${ baseWsUrl }:${ port }${ graphqlClientSubsPath }`);
});
