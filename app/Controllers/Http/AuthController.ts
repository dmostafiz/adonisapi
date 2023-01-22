import { prisma } from '@ioc:Adonis/Addons/Prisma';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail';
import WelcomeEmail from 'App/Mailers/WelcomeEmail';

export default class AuthController {

    async register({ request, response, auth }: HttpContextContract) {
        try {

            const user = await prisma.user.create({
                data: {
                    email: request.input('email'),
                    name: request.input('name'),
                    password: await Hash.make(request.input('password'))
                }
            })

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

            console.log('User created', user)

            const token = await auth.login(user)

            return response.send({ token })

        } catch (error) {

            return { ok: false, msg: 'Invalid credentials' }

        }
    }

    async login({ request, auth }: HttpContextContract) {

        try {

            const token = await auth.attempt(request.input('email'), request.input('password'))

            // if(!token) return response.unauthorized('Invalid credentials')

            // console.log('User sucks', token)


            await new WelcomeEmail(auth.user).sendLater()


            return token

        } catch (error) {

            return { ok: false, msg: 'Invalid credentials' }

        }
    }
}
