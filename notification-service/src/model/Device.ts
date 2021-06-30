import {
  Table,
  Column,
  Model,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsToMany
} from "sequelize-typescript";
import { UserDevices } from "./UserDevices";

@Table({ tableName: "devices" })
export class Device extends Model<Device> {

  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @AllowNull(false)
  @Column
  public model: string;

  @AllowNull(false)
  @Column
  public os: string;

  @AllowNull(false)
  @Column
  public token: string;

  @AllowNull(false)
  @Column
  public phone: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasMany(() => UserDevices, { as: "userDevices" })
  userDevices: UserDevices[];

}
