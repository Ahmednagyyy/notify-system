import {
  Table,
  Column,
  Model,
  ForeignKey,
  AutoIncrement,
  BelongsTo
} from "sequelize-typescript";
import { User } from "./User";
import { Group } from "./Group";

@Table({ tableName: "user_groups"})
export class UserGroups extends Model<UserGroups> {
  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @BelongsTo(() => User, { targetKey: "id" })
  user: User;

  @BelongsTo(() => Group)
  group: Group;
}
