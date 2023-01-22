import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { prisma } from "@ioc:Adonis/Addons/Prisma";
// import { User } from "@prisma/client";

export default class UsersController {

    async getUsers({request, auth}: HttpContextContract) {
        const users  = await prisma.user.findMany()

        // console.log('Auth User', request.myname)

        return users
    }
}
