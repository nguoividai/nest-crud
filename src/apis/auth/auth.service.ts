import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new Error('Invalid credentials');

    const safeUser = omit(user, ['password']);
    return safeUser;
  }

  login(user: Omit<User, 'password'>): { access_token: string } {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateTokens(user: Omit<User, 'password'>) {
    const payload = { sub: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'access_secret', // ⛔ move to .env
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'refresh_secret', // ⛔ move to .env
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { hashed_refresh_token: hash });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);

    if (!user?.hashed_refresh_token) return null;

    const isMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!isMatch) return null;

    const tokens = await this.generateTokens(user);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { hashed_refresh_token: undefined });
  }
}
