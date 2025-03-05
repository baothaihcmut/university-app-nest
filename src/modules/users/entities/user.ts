import { UUID } from 'crypto';
import { Role } from 'src/common/enums/role';

export class User {
  id: UUID;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  currentRefreshToken?: string;
  phoneNumber?: string;
  imageId?: string;
  birthplace?: string;
  birthday?: Date;
  socialNetworkInfo?: string;
  address?: string;
  role: Role;
  isActive: boolean;
  student?: any;
  teacher?: any;
  image?: string;
}
