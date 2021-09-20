import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs"
import { User } from "../../entity/User"
import { RegisterInput } from "./register/RegisterInput";
import { sendMail } from "../utils/sendEmail"
import { createConfirmationURL } from "../utils/createConfirmationURL";
@Resolver(User)
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World";
    }


    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPW = await bcrypt.hash(password, 12)
        const user = await User.create(
            { firstName, lastName, email, password: hashedPW }
        ).save()

        await sendMail(email, await createConfirmationURL(user.id))
        return user;
    }
}


