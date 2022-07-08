import { UserProps } from '../../entities/User';

export type ICreateUserDTO = Omit<UserProps, 'id'>;
