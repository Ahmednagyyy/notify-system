import { injectable } from "inversify";
import { Device } from "../model/Device";
import { Group } from "../model/Group";
import { User } from "../model/User";

export interface UsersRepository {
    findAllUserDevices(userId: string): Promise<User>;
    findAllUserGroups(groupId: String): Promise<Array<User>>;
    find(userId: string): Promise<User>;
}

@injectable()
export class UsersRepositoryImplDb implements UsersRepository {

    constructor() {
    }
    public async find(userId: string): Promise<User> {
        return await User.findByPk(userId,{
            attributes: ["id", "name", "notificationEnabled" ],
        
        });
    }

    public async findAllUserDevices(userId: string): Promise<User> {
        return await User.findByPk(userId, {
            attributes: ["id", "name", "notificationEnabled" ],
            include: [{
                model: Device,
                attributes: ["id", "model", "os", "token"]
            }]
        });
    }

    public async findAllUserGroups(groupId: any): Promise<Array<User>> {
        return await User.findAll({
            attributes: ["id", "name", "notificationEnabled" ],
            include: [{
                model: Group,
                attributes: ["id", "name"],
                where: { id : groupId}
            }]
        });
    
    }
}