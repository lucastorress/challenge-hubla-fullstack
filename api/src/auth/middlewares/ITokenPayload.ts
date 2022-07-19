import { JwtPayload } from 'jsonwebtoken';
import { Roles } from '../../user/entities/User';

export default interface TokenPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: Roles;
}
