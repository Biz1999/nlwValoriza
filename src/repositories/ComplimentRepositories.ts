import { Compliment } from "../entities/Compliment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Compliment)
class ComplimentRepositories extends Repository<Compliment> {}

export {ComplimentRepositories}