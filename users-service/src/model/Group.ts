import {
  Table,
  Column,
  Model,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  HasMany
} from "sequelize-typescript";
import { UserGroups } from "./UserGroups";

@Table({ tableName: "groups" })
export class Group extends Model<Group> {

  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @AllowNull(false)
  @Column
  public name: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @HasMany(() => UserGroups, { as: "userGroups" })
  userGroups: UserGroups[];

}
