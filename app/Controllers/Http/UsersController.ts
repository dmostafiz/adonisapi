import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from "@ioc:Adonis/Addons/Prisma";
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import Drive from '@ioc:Adonis/Core/Drive'

// import { User } from "@prisma/client";

export default class UsersController {

    async getUsers({ }: HttpContextContract) {
        const users = await prisma.user.findMany()

        // console.log('Auth User', request.myname)

        return users
    }


    async upload({ request }: HttpContextContract) {

        const file: any = request.file('file')

        console.log(file)

        const uploaded = await cloudinary.upload(file, file?.clientName)

        console.log('File Uploaded: ', uploaded)

        return uploaded

    }

    async uploadStream({ request }: HttpContextContract) {

        // request.multipart.onFile('file', {},  async (part) => {
        //     // console.log('File Upload part: ', part)
        //     await Drive.putStream('sd', part)
        // })

        // await request.multipart.process()

        const file = request.file('file')

        const up =  await file?.moveToDisk('', {}, 's3')
        
        console.log(up)
        
        return up
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
