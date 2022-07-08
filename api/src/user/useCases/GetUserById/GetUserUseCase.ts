import IUsersRepository from '../../repositories/IUsersRepository';
import { IGetUserRequestDTO } from './GetUserDTO';

export class GetUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: IGetUserRequestDTO) {
    const user = await this.repository.findById(props.id);
    return user.valueOf();
  }
}
