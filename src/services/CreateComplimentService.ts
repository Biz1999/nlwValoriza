import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({
    tag_id, 
    user_sender, 
    user_receiver, 
    message
  }: IComplimentRequest): Promise<Compliment> {
    const complimentRepositories = getCustomRepository(ComplimentRepositories); 
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) throw new Error("User receiver does not exists!");

    const compliment = complimentRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };