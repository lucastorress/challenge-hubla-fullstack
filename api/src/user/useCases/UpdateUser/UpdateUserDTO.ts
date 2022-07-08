import { UserProps } from '../../entities/User';

export interface IUpdateUserDTO {
  userId: string;
  body: Omit<UserProps, 'id'>;
}
