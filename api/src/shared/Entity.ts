import { v4 as uuid } from 'uuid';

export abstract class Entity<T> {
  protected _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? uuid();
  }

  get id() {
    return this._id;
  }
}
