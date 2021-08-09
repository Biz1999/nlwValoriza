import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({email: email
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verificar se senha está correta
    const isPasswordMatch =  await compare(password, user.password)

    if(!isPasswordMatch) throw new Error("Email/Password incorrect");

    // Gerar Token
    const token = sign({
      email: user.email
    }, "74c89ac305581bbadb811440acf8d789", {
      subject : user.id,
      expiresIn: "1d"
    })

    return token;
  }
}

export { AuthenticateUserService }