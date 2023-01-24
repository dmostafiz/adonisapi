import { prisma } from '@ioc:Adonis/Addons/Prisma';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail';
import WelcomeEmail from 'App/Mailers/WelcomeEmail';
import Ws from 'App/Services/Ws';

export default class AuthController {

    async register({ request, auth }: HttpContextContract) {

        try {

            const user = await prisma.user.create({
                data: {
                    email: request.input('email'),
                    name: request.input('name'),
                    password: await Hash.make(request.input('password'))
                }
            })


            Ws.io.emit('new:user', { username: 'virk' })

            await Mail.sendLater((message) => {

                message
                    .from('info@example.com')
                    .to(user.email)
                    .subject('Welcome Onboard!')
                    .htmlView('emails/welcome', {
                        user: { name: user.name },
                        url: 'https://your-app.com/verification-url',
                    })

            })

            // console.log('User created', user)

            const token = await auth.login(user)

            return token

        } catch (error) {

            return { ok: false, msg: error}

        }
    }


    async login({ request, auth }: HttpContextContract) {

        try {

            const token = await auth.attempt(request.input('email'), request.input('password'))

            await new WelcomeEmail(auth.user).sendLater()


            return token

        } catch (error) {

            return { ok: false, msg: 'Invalid credentials' }

        }
    }
}
