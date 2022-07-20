import IUsersRepository from '../../repositories/IUsersRepository';
import { IUpdateUserDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: IUpdateUserDTO) {
    const searchUserById = await this.repository.findById(props.userId);

    if (!searchUserById) {
      throw new Error('User not found.');
    }

    const user = await this.repository.update(props.userId, props.body);

    return user.valueOf();
  }
}
