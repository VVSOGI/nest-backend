import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { HashingService } from 'src/utils/hashing.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UpdatePermissions } from 'src/users/types/types';

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
    const accessToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME },
    );
    return { accessToken, refreshToken };
  }

  async login(user: LoginUserDto) {
    const { email, password } = user;
    const foundUsers = await this.usersRepository.findUserByEmail(email);
    await this.checkPassword(foundUsers, password);
    const { accessToken, refreshToken } = await this.generateToken(foundUsers);
    return { accessToken, refreshToken };
  }

  async profile() {
    return 'profile';
  }

  async adminCheck(id: string) {
    const { permission } = await this.usersRepository.findUserById(id);
    if (permission !== 'admin') {
      throw new UnauthorizedException('Only admin can update permission.');
    }
    return true;
  }

  async updatePermission(updatePermissions: UpdatePermissions) {
    return this.usersRepository.updateUserPermission(updatePermissions);
  }
}
