import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  AutoIncrement,
  AllowNull
} from "sequelize-typescript";

@Table({ tableName: "group" })
export class Group extends Model<Group> {

  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @AllowNull(false)
  @Column
  public name: string;

}
