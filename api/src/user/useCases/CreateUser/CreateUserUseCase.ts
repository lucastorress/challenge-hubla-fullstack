import IUsersRepository from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from './CreateUserDTO';
import validateEmail from '../../entities/helpers/validateEmail';

export class CreateUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: ICreateUserDTO) {
    const isValidEmail = validateEmail(props.email);

    if (!isValidEmail) {
      throw new Error('E-mail inválido.');
    }

    const searchUserByEmail = await this.repository.findByEmail(props.email);

    if (searchUserByEmail) {
      throw new Error('Usuário já cadastrado.');
    }

    const user = await this.repository.save(props);
    return user.valueOf();
  }
}
