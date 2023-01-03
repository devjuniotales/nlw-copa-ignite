import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
    const user = await prisma.user.create({
        data : {
            name : 'globiz',
            email : 'globizcf@gmail.com',
            avatarUrl : 'https://avatars.githubusercontent.com/u/55240038?v=4'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title : 'Example Pool',
            code : 'dsa222',
            ownerId : user.id,

            participants : {
                create: {
                  userId:  user.id
                }
            }
        }
    })

    await prisma.game.create({
        data : {
            date : '2022-11-18T23:03:03.913Z',
            firstTeamCountryCode : 'DE',
            secondTeamCountryCode : 'BR'
        }
    })

    await prisma.game.create({
        data : {
            date : '2022-11-12T20:03:03.913Z',
            firstTeamCountryCode : 'AR',
            secondTeamCountryCode : 'BR',

            guesses : {
                create : {
                    firstTeamPoints : 2,
                    secondTeamPoints : 1,

                    participant :  {
                        connect : {
                            userId_poolId : {
                                userId : user.id,
                                poolId  : pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}
main()