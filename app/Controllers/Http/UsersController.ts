import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { prisma } from "@ioc:Adonis/Addons/Prisma";
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import User from 'App/Models/User';
import Database from '@ioc:Adonis/Lucid/Database';
// import moment from 'moment';
// import Drive from '@ioc:Adonis/Core/Drive'

// const to_knex = require('postgresql-to-knex')
// import Drive from '@ioc:Adonis/Core/Drive'

// import { User } from "@prisma/client";

export default class UsersController {

    async getUsers({ }: HttpContextContract) {
        // const users = await prisma.user.findMany()

        // const users: User[] = await User.query().preload('children', (q) => {
        //     return q.preload('children')
        // })

        // Working for grouping users ---------> MySql
        // const users = Database.query()
        //     .where(Database.raw('MONTH(created_at)'), '=', 2)
        //     .select(Database.raw("DATE_FORMAT(created_at, '%M, %Y') as month,  DAY(created_at) as day, DATE(created_at) as date, COUNT(*) as count"))
        //     .groupBy(`month`)
        //     .from('users')

        const users = await User.all()



        // extract(element: string, input: timetz)
        // const users = Database.query()
        //     .select(Database.raw("extract('month', created_at) as month, date_part('day', created_at) as day"))
        //     // .orderBy('month', 'desc')
        //     .groupBy(`month`)
        //     // .sum('id as total')
        //     .from('users')

        console.log('All Users', users.length)

        return users
    }

    async getUserById({}: HttpContextContract) {
        // const users = await prisma.user.findMany()

        // const userId = request.param('userId')

        let query = `SELECT id, date_trunc('month', created_at) y, COUNT (id) as userCount FROM users   GROUP BY id, y ORDER BY y`;



        const user = await Database.rawQuery(query)


        // .orderBy("created_month")

        // console.log('Auth User', request.myname)
        // console.log(to_knex("SELECT a, fruit_a, b, fruit_b FROM basket_a JOIN basket_b ON fruit_a = fruit_b;"))
        // knex.select(`a`, `fruit_a`, `b`, `fruit_b`, ).from(`basket_a`).innerJoin(`basket_b`, function() { this.on("fruit_a","=","fruit_b")})

        // const user = Database.rawQuery("SELECT to_char(date_trunc('month', created_at), 'YYYY, Month') AS created_month, COUNT(id) AS total_registrations FROM users GROUP BY date_trunc('month', created_at) ORDER BY date_trunc('month', created_at)")

        return user
    }



    async upload({ request }: HttpContextContract) {

        const file: any = request.file('file')

        console.log(file)

        const uploaded = await cloudinary.upload(file, file?.clientName)

        console.log('File Uploaded: ', uploaded)

        return uploaded

    }

    async uploadStream({ request }: HttpContextContract) {

   
        try {

            const file = request.file('myFile', {
                size: '10mb',
                extnames: ['jpg', 'png', 'gif'],
            })

            if (!file) {
                return {error: 'File not found'}
            }

            if (!file.isValid) {
                return file.errors
            }

            await file.moveToDisk('/uploads', {}, 's3')

            console.log(file)

            // return Drive.getSignedUrl(file.filePath)

            return file

        } catch (error) {

            console.log(error)

            return error

        }
    }


    async showFile({ request }: HttpContextContract) {

        // const file = request.file('file')
        const fileId = request.param('fileId')


        const uploaded = await cloudinary.destroy(fileId)

        // console.log(fileId)
        console.log('File show: ', uploaded)

        return uploaded

    }
}
