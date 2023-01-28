// import { prisma } from '@ioc:Adonis/Addons/Prisma';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail';
import WelcomeEmail from 'App/Mailers/WelcomeEmail';
import Ws from 'App/Services/Ws';
import User from 'App/Models/User';
// import { User } from '@prisma/client';

export default class AuthController {

    async register({ request, auth }: HttpContextContract) {

        try {

            // const user: User = await prisma.user.create({
            //     data: {
            //         email: request.input('email'),
            //         name: request.input('name'),
            //         password: await Hash.make(request.input('password'))
            //     }
            // })

            const user: User = new User()
            user.name = request.input('name')
            user.email = request.input('email')
            user.parentId = request.input('parentId')
            user.password = request.input('password')

            await user.save()

            console.log('User created' + user)

            Ws.io.emit('new:user', { email: user.email })

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
            console.log('Login Error: ' + error)

            return { ok: false, msg: error }

        }
    }


    async login({ request, auth }: HttpContextContract) {

        try {

            const token = await auth.attempt(request.input('email'), request.input('password'))

            const user = auth.user

            await new WelcomeEmail(user!).sendLater()

            // console.log('User logged' + JSON.toString(token))
            return token

        } catch (error) {

            console.log('Login Error: ' + error)

            return { ok: false, msg: error }

        }
    }
}
