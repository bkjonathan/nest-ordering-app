import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schema/user.schema';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(payload: CreateUserDto) {
    await this.validateCreateUserRequest(payload);
    return await this.usersRepository.create({
      ...payload,
      password: hash(payload.password, 10) as unknown as string,
    });
  }

  private async validateCreateUserRequest(payload: CreateUserDto) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({ email: payload.email });
    } catch (e) {}
    if (user) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUser: Partial<User>) {
    return this.usersRepository.findOne(getUser);
  }
}
