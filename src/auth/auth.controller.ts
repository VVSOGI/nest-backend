import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { UpdateUserPermissionDto } from 'src/users/dto/permission-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('profile')
  profile() {
    return this.authService.profile();
  }

  @Patch(':id/permission')
  @UseGuards(JwtAuthGuard)
  async updatePermission(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserPermissionDto: UpdateUserPermissionDto,
  ) {
    const requestUserId = req.user.id;
    await this.authService.adminCheck(requestUserId);
    return this.authService.updatePermission({
      id,
      ...updateUserPermissionDto,
    });
  }
}
