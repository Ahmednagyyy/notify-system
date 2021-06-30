import { IsEmail, Table, Column, Model, AutoIncrement, AllowNull, BelongsToMany } from "sequelize-typescript";
import { Device } from "./Device";
import { Group } from "./Group";
import { UserDevices } from "./UserDevices";
import { UserGroups } from "./UserGroups";

@Table({tableName: "users"})
export class User extends Model<User> {

    @AutoIncrement
    @Column({ primaryKey: true })
    public id: number;

    @AllowNull(false)
    @Column
    public name: string;

    @AllowNull(false)
    @Column
    public notificationEnabled: boolean;

    @BelongsToMany(() => Device, () => UserDevices)
    devicesList: UserDevices[];

    @BelongsToMany(() => Group, () => UserGroups)
    groupsList: UserGroups[];
}