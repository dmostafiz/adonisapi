import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import { User } from '@prisma/client'

export default class WelcomeEmail extends BaseMailer {

  constructor (private user: User) {
    super()
  }

  public prepare(message: MessageContract) {
    message.from('info@example.com')
    .to(this.user.email)
    .subject('Welcome Onboard from mailer!')
    .htmlView('emails/welcome', {
        user: { name: this.user.name },
        url: 'https://your-app.com/verification-url',
    })
  }
}
