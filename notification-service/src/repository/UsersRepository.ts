import { injectable } from "inversify";
import { Device } from "../model/Device";
import { Group } from "../model/Group";
import { User } from "../model/User";
import { UserDevices } from "../model/UserDevices";
import { UserGroups } from "../model/UserGroups";

export interface UsersRepository {
    findAllUserDevices(userId: string): Promise<User>;
    findAllUserGroups(groupId: String): Promise<Array<User>>;
}

@injectable()
export class UsersRepositoryImplDb implements UsersRepository {

    constructor() {
    }
 
    public async findAllUserDevices(userId: string): Promise<User> {
        // Build query to get user along with any related device if relation exists
        return await User.findByPk(userId, {
            attributes: ["id", "name", "notificationEnabled"],
            include: [{
                model: Device,
                include: [{
                    model: UserDevices
                }]
            }]
        });
    }

    public async findAllUserGroups(groupId: any): Promise<Array<User>> {
        // Build query to get users by the groupId along with any related device if relation exists
        return await User.findAll({
            attributes: ["id", "name", "notificationEnabled"],
            include: [{
                model: Device,
                include: [{
                    model: UserDevices
                }]
            }, {
                model: Group,
                where: { id: groupId },
                include: [{
                    model: UserGroups,
                }]
            }]
        });

    }
}