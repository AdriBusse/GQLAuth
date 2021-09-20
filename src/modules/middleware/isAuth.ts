import { MyContext } from "../../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error("not Authenticated")
    }
    console.log(context.req.session!.userId);

    return next();
};