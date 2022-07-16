import uuid = require('uuid');

const validateUUID = (id: string) => uuid.validate(id);

const v4 = uuid.v4();

export { validateUUID, v4 };
