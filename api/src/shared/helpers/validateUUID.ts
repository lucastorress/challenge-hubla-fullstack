import uuid from 'uuid';

const validateUUID = (id: string) => uuid.validate(id);

export default validateUUID;
