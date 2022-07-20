import { UserProps } from '../../entities/User';

export type IGetUserRequestDTO = {
  id: string;
};

export interface IGetUserResponseDTO extends Omit<UserProps, 'password'> {
  id: string;
}
