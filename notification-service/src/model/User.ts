import { IsEmail, Table, Column, Model, AutoIncrement, AllowNull, BelongsToMany } from "sequelize-typescript";
import { Device } from "./Device";
import { UserDevices } from "./UserDevices";

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

    @AllowNull(false)
    @Column
    public phoneNumber: string;

    @BelongsToMany(() => Device, () => UserDevices)
    devicesList: UserDevices[];
}