import IUsersRepository from '../../repositories/IUsersRepository';
import { AddProducerToAffiliateDTO } from './AddProducerToAffiliateDTO';
import { Roles } from '../../entities/User';

export class CreateUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: AddProducerToAffiliateDTO) {
    const searchProducerById = await this.repository.findById(props.producerId);

    if (!searchProducerById) {
      throw new Error('Usuário não encontrado.');
    }

    const searchAffiliateById = await this.repository.findById(
      props.affiliateId,
    );

    if (!searchAffiliateById) {
      throw new Error('Usuário não encontrado.');
    }

    const relation = await this.repository.addRelationProducerAffiliate(
      props.producerId,
      props.affiliateId,
    );

    if (!relation) {
      throw new Error('Relação não criada.');
    }

    return relation;
  }
}
