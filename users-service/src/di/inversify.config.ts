import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./types";
import { UsersRepository, UsersRepositoryImplDb } from "../repository/UsersRepository";
import { UserService, UserServiceImpl } from "../service/UserService";
import { NotificationService, NotificationServiceImpl } from "../service/NotificationService";

const container = new Container();

//Provide User Service for dependency injection
container.
bind<UserService>(TYPES.UsersService).to(UserServiceImpl);

//Provide Notification Service for dependency injection
container.
bind<NotificationService>(TYPES.NotificationService).to(NotificationServiceImpl);

//Provide Users Repository for dependency injection
container
  .bind<UsersRepository>(TYPES.UsersRepository)
  .to(UsersRepositoryImplDb);


export default container;
