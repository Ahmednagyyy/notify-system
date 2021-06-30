import { injectable } from "inversify";
import { Device } from "../model/Device";
import { Group } from "../model/Group";
import { User } from "../model/User";

export interface UsersRepository {
    findAllUserDevices(userId: string): Promise<Array<User>>;
    findAllUserGroups(userId: string, groupId: String): Promise<Array<User>>;
    find(userId: string): Promise<User>;
}

@injectable()
export class UsersRepositoryImplDb implements UsersRepository {

    constructor() {
    }
    public async find(userId: string): Promise<User> {
        return await User.findByPk(userId);
    }

    public async findAllUserDevices(userId: string): Promise<Array<User>> {
        return await User.findAll({
            include: [{
                model: Device,
                attributes: ["id", "model", "os", "token"],
            }],
            where: {
                id : userId
            }
        });
    }

    public async findAllUserGroups(userId: string, groupId: any): Promise<Array<User>> {
        return await User.findAll({
            include: [{
                model: Group,
                attributes: ["id", "name"],
                where: { id : groupId}
            }],
            where: {
                id: userId,
            }
        });
    
    }
}