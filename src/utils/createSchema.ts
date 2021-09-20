import { ChangePasswordResolver } from './../modules/user/ChangePassword';
import { RegisterResolver } from './../modules/user/Register';
import { MeResolver } from './../modules/user/Me';
import { LogoutResolver } from './../modules/user/Logout';
import { LoginResolver } from './../modules/user/Login';
import { ForgetPasswordResolver } from './../modules/user/ForgetPassword';
import { ConfirmUserResolver } from './../modules/user/ConfirmUser';
import { buildSchema } from "type-graphql";

export const createSchema = () => buildSchema({
    resolvers: [ConfirmUserResolver, ForgetPasswordResolver, LoginResolver, LogoutResolver, MeResolver, RegisterResolver, ChangePasswordResolver],
});