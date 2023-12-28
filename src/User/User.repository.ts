import { dataSource } from "database/data.source";
import { User } from "./User.entity";

export const UserRepository = dataSource.getRepository(User).extend({

})