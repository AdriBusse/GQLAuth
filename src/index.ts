import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis"
import { redis } from "./redis";
import cookieParser from "cookie-parser"
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createSchema } from "./utils/createSchema";

declare module 'express-session' {
    interface Session {
        userId: any;
    }
}

const main = async () => {
    await createConnection()



    const schema = await createSchema()

    const apolloServer = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        context: ({ req, res }: any) => ({ req, res }), // just for access the context
    })

    const app = Express()

    app.use(cookieParser())

    const RedisStore = connectRedis(session)

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: "gqlcookie",
            secret: "mysecret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                //sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 365 * 7, // 7 years
            }
        } as any)
    )


    await apolloServer.start();
    apolloServer.applyMiddleware({
        app, cors: {
            credentials: true,
            origin: 'https://studio.apollographql.com',
        }
    })

    app.listen(4000, () => { console.log("app start on http://localhost:4000/graphql") });


}
main()