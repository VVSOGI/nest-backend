import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { HashingService } from 'src/utils/hashing.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  private async checkPassword(user: User, password: string) {
    const isMatch = await this.hashingService.comparePasswords(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Password not match');
    }
  }

  private async generateToken(user: User) {
    const accesstoken = await this.jwtService.signAsync(
      { email: user.email },
      { expiresIn: '5m' },
    );
    const refreshtoken = await this.jwtService.signAsync(
      { email: user.email },
      { expiresIn: '7d' },
    );
    return { accesstoken, refreshtoken };
  }

  async login(user: LoginUserDto) {
    const { email, password } = user;
    const foundUsers = await this.usersRepository.findUserByEmail(email);
    await this.checkPassword(foundUsers, password);
    const { accesstoken, refreshtoken } = await this.generateToken(foundUsers);
    return { accesstoken, refreshtoken };
  }

  async profile() {
    return 'profile';
  }
}
