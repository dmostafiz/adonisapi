import { TaskContract } from '@ioc:StouderIO/Scheduler'
import User from 'App/Models/User'

export default class TestTask implements TaskContract {
  public readonly name: string = 'TestTask'
  public readonly cron: string = '*/12 * * * * *'

  public async run(): Promise<void> {

    try {
      const users: User[] = await User.all()
      
      console.log('Users count: ', users.length)
      
    } catch (error) {
      console.log('User count error: ', error)
    }
  }
}
