import { UserProps } from './User';

type Affiliate = {
  id: string;
  name: string;
};

export interface Producer extends UserProps {
  products?: string[];
  affiliates?: Affiliate[];
}
