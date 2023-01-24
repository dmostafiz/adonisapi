/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'
import Env from "@ioc:Adonis/Core/Env";

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'jwt',

  guards: {

    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'user_id',
      },
      provider: {
        driver: 'prisma',
        identifierKey: 'id',
        uids: ['email'],
        model: 'user',
      },
    },

    jwt: {
      driver: "jwt",
      publicKey: Env.get('JWT_PUBLIC_KEY', '').replace(/\\n/g, '\n'),
      privateKey: Env.get('JWT_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
      persistJwt: false,
      jwtDefaultExpire: '10m',
      refreshTokenDefaultExpire: '10d',
      tokenProvider: {
        type: 'jwt',
        driver: 'redis',
        redisConnection: 'local',
        foreignKey: 'user_id'
      },
      provider: {
        driver: 'prisma',
        identifierKey: 'id',
        uids: ['email'],
        model: 'user'
      }
    },
  },
}

export default authConfig
