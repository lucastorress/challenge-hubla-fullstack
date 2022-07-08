import { UserProps } from './User';

type Producer = {
  id: string;
  name: string;
};

export interface Affiliate extends UserProps {
  producers?: Producer[];
}
