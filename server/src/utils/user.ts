import type { PublicUser } from '../types/index';

interface UserLike {
  id: string;
  email: string;
  name: string;
  image: string | null;
  emailVerified: boolean;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  createdAt: Date;
}

/**
 * Strip sensitive fields and return only the user data safe to send to the client.
 */
export function toPublicUser(user: UserLike): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    emailVerified: user.emailVerified,
    role: user.role,
    createdAt: user.createdAt,
  };
}
