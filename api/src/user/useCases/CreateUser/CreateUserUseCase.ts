import IUsersRepository from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from './CreateUserDTO';
import validateEmail from '../../entities/helpers/validateEmail';
import { Roles } from '../../entities/User';

export class CreateUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: ICreateUserDTO) {
    const isValidEmail = validateEmail(props.email);

    if (!isValidEmail) {
      throw new Error('Invalid email.');
    }

    const searchUserByEmail = await this.repository.findByEmail(props.email);

    if (searchUserByEmail) {
      throw new Error('User already registered. Try another email.');
    }

    if (!props.role) {
      props.role = Roles.PRODUCER;
    }

    const user = await this.repository.save(props);
    return user.valueOf();
  }
}
