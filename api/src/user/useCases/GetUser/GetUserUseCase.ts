import IUsersRepository from '../../repositories/IUsersRepository';
import { IGetUserRequestDTO, IGetUserResponseDTO } from './GetUserDTO';

export class GetUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: IGetUserRequestDTO) {
    const user = await this.repository.findById(props.id);
    const { password, ...userResponse } = user.valueOf();
    return userResponse as IGetUserResponseDTO;
  }
}
