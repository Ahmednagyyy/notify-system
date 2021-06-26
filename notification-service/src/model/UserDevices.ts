import {
  Table,
  Column,
  Model,
  ForeignKey,
  AutoIncrement,
  BelongsTo
} from "sequelize-typescript";
import { User } from "./User";
import { Device } from "./Device";

@Table({ tableName: "user_devices"})
export class UserDevices extends Model<UserDevices> {
  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Device)
  @Column
  deviceId: number;

  @BelongsTo(() => User, { targetKey: "id" })
  user: User;

  @BelongsTo(() => Device)
  device: Device;
}
