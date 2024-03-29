import { BASE_URL, WS_BASE_URL } from '../../environments/environment';

export const API_URL = `${ BASE_URL }/api`;
export const WS_API_URL = `${ WS_BASE_URL }/api`;

export const GRAPHQL_URL = `${ API_URL }/graphql`;
export const WS_GRAPHQL_URL = `${ WS_API_URL }/graphql`;

export const accessTokenKey = 'accessToken';
export const appName = 'Student Permits';
