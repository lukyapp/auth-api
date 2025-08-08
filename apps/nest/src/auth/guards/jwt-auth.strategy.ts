import {
  OpenIdPublicJwkGetterStrategy,
  PublicKeyGetter,
  ValidationService,
} from '@auth/application';
import { ConfigurationServicePort } from '@auth/domain';
import { Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from '@auth/domain';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUserDto } from '../../core/controller/current-user.decorator';
import { Injectable } from '../../core/di/injectable.decorator';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  public readonly logger = new Logger(this.constructor.name);

  constructor(
    public readonly configurationService: ConfigurationServicePort,
    public readonly publicKeyGetter: PublicKeyGetter,
    public readonly openIdPublicJwkGetterStrategy: OpenIdPublicJwkGetterStrategy,
  ) {
    const verifyOptions = {
      algorithms: configurationService.get('jwt.verify.authorizedAlgorithms'),
      audience: configurationService.get('jwt.verify.authorizedAudiences'),
      issuer: configurationService.get('jwt.verify.authorizedIssuers'),
      ignoreExpiration: false,
    };
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (
        _request: Request,
        rawJwt: string,
        done: (err: any, key?: string | Buffer) => void,
      ) => {
        this.publicKeyGetter
          .get(this.openIdPublicJwkGetterStrategy, { rawJwt })
          .then((publicKey) => {
            done(null, publicKey.pem);
          })
          .catch((err) => {
            done(err);
          });
      },
      algorithms: verifyOptions.algorithms,
      audience: verifyOptions.audience,
      issuer: verifyOptions.issuer,
      ignoreExpiration: verifyOptions.ignoreExpiration,
    });
  }

  validate(payload: JwtPayload) {
    return ValidationService.validate(CurrentUserDto, {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    });
  }
}
