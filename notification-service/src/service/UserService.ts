import { injectable, inject } from "inversify";
import { UsersRepository } from "../repository/UsersRepository";
import TYPES from "../di/types";
import "reflect-metadata";
import { User } from "../model/User";

export interface UserService {
    getAllUserDevices(userId: string): Promise<User>;
    getUserGroups(groupId: String): Promise<Array<User>>;
    getUser(userId: string): Promise<User>;
}

@injectable()
export class UserServiceImpl implements UserService {
    @inject(TYPES.UsersRepository)
    private UsersRepositoryDb: UsersRepository;

    public async getAllUserDevices(userId: string): Promise<User> {
        const UsersDb: User = await this.UsersRepositoryDb.findAllUserDevices(userId);
        return UsersDb;
    }
    public async getUserGroups(groupId: String): Promise<User[]> {
        const UsersDb: Array<User> = await this.UsersRepositoryDb.findAllUserGroups(groupId);
        return UsersDb;
    }
    public async getUser(userId: string): Promise<User> {
        const user = await this.UsersRepositoryDb.find(userId);
        return user;  
    }

}