import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepositories } from "../repositories/TagRepositories";


class CreateTagService {
  async execute(name: string): Promise<Tag>{
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if(!name) throw new Error("Incorrect name!");

    const tagAlreadyExists = await tagsRepositories.findOne({ 
      name 
    });

    if(tagAlreadyExists) throw new Error(`Tag ${name} already exists`);

    const tag = tagsRepositories.create({
      name
    })

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };