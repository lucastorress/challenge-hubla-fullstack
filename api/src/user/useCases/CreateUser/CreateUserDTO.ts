import { UserProps } from '../../entities/User';

export interface ICreateUserDTO extends Omit<UserProps, 'id'> {
  email: string;
  password: string;
}
