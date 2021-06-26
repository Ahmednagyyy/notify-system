import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  AutoIncrement,
  AllowNull
} from "sequelize-typescript";

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

}
