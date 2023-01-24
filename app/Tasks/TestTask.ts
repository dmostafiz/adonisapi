import { TaskContract } from '@ioc:StouderIO/Scheduler'
import { prisma } from "@ioc:Adonis/Addons/Prisma";

export default class TestTask implements TaskContract {
  public readonly name: string = 'TestTask'
  public readonly cron: string = '*/30 * * * * *'

  public async run(): Promise<void> {

    const users = await prisma.user.count()
    
    console.log('Users count: ', users)
  }
}
