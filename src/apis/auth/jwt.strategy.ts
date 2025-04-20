import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my_jwt_secret',
    });
  }

  validate(payload: { sub: string; email: string }): {
    userId: string;
    email: string;
  } {
    return { userId: payload.sub, email: payload.email };
  }
}
