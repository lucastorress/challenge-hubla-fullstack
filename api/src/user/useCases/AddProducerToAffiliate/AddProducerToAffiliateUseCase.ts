import IUsersRepository from '../../repositories/IUsersRepository';
import { AddProducerToAffiliateDTO } from './AddProducerToAffiliateDTO';

export class AddProducerToAffiliateUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(props: AddProducerToAffiliateDTO) {
    const searchProducerById = await this.repository.findById(props.producerId);

    if (!searchProducerById) {
      throw new Error('User not found.');
    }

    const searchAffiliateById = await this.repository.findById(
      props.affiliateId,
    );

    if (!searchAffiliateById) {
      throw new Error('User not found.');
    }

    const relation = await this.repository.addRelationProducerAffiliate(
      props.producerId,
      props.affiliateId,
    );

    if (!relation) {
      throw new Error(`Relation couldn't to be created.`);
    }

    return relation;
  }
}
