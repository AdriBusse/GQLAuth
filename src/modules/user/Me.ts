
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User"
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        console.log(ctx.req.session);

        if (!ctx.req.session.userId) {
            console.log("no userid");
            return undefined
        }
        return User.findOne(ctx.req.session.userId);
    }

}
