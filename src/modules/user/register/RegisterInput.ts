import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {

    @Field()
    @Length(1, 30)
    firstName: string;

    @Field()
    @Length(1, 30)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;

}