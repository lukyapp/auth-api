import { Utils } from '@auth/core';
import { ConfigurationServicePort } from '@auth/domain';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Request } from 'express';
import { decode, JwtPayload } from 'jsonwebtoken';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CurrentUserDto } from '../../core/controller/current-user.decorator';
import { ValidationService } from '@auth/application';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  public readonly logger = new Logger(this.constructor.name);

  constructor(public readonly configurationService: ConfigurationServicePort) {
    const verifyOptions = {
      algorithms: configurationService.get('jwt.verify.authorizedAlgorithms'),
      audience: configurationService.get('jwt.verify.authorizedAudiences'),
      issuer: configurationService.get('jwt.verify.authorizedIssuers'),
      ignoreExpiration: false,
    };
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (
        request: Request,
        rawJwtToken: string,
        done: (err: any, key?: string | Buffer) => void,
      ) => {
        JwtAuthStrategy.secretOrKeyProvider(
          request,
          rawJwtToken,
          done,
          this,
        ).catch((err) => {
          this.logger.log(err);
          done(err);
        });
      },
      algorithms: verifyOptions.algorithms,
      audience: verifyOptions.audience,
      issuer: verifyOptions.issuer,
    });
  }

  private static async secretOrKeyProvider(
    request: Request,
    rawJwtToken: string,
    done: (err: any, key?: string | Buffer) => void,
    jwtAuthStrategy: JwtAuthStrategy,
  ) {
    const jwtPayload = decode(rawJwtToken, { json: true });
    const { jwks_uri: jwksUri } = await this.getOpenIdConfig(
      jwtPayload,
      jwtAuthStrategy,
    );
    if (!jwksUri) {
      jwtAuthStrategy.logger.log('no jwksUri in the open id configuration');
      throw new UnauthorizedException();
    }
    jwtAuthStrategy.logger.log('jwksUri : ', jwksUri);
    passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri,
    })(request, rawJwtToken, done);
  }

  private static async getOpenIdConfig(
    jwtPayload: JwtPayload | null,
    jwtAuthStrategy: JwtAuthStrategy,
  ): Promise<{ jwks_uri?: string }> {
    if (!jwtPayload) {
      jwtAuthStrategy.logger.log('jwt payload is null');
      throw new UnauthorizedException();
    }
    const issuer = jwtPayload.iss;
    if (!issuer) {
      jwtAuthStrategy.logger.log('token issuer is null');
      throw new UnauthorizedException();
    }
    const { data } = await axios.get<{ jwks_uri?: string }>(
      Utils.urlJoin(issuer, '.well-known/openid-configuration'),
    );
    return data;
  }

  validate(payload: JwtPayload) {
    return ValidationService.validate(CurrentUserDto, {
      userId: payload.sub!,
      email: payload.email!,
      roles: (payload.roles as string[])!,
    });
  }
}
