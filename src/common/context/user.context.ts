import { UUID } from 'crypto';
import { Role } from '../enums/role';

export interface UserContext {
  userId: UUID;
  role: Role;
}
