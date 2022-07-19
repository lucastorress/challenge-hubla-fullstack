import { JwtPayload } from 'jsonwebtoken';

export default interface TokenPayload extends JwtPayload {
  id: string;
}
