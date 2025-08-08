import { Utils } from '@auth/core';
import { injectable } from '@auth/di';
import { DecodedJwtPayload } from '@auth/domain';
import { UnauthorizedException } from '@auth/domain';
import axios from 'axios';
import { OpenidConfiguration } from '../../primary-services/jwks/use-cases/get-open-id-configuration.use-case';
import { GenericService } from '../logger/generic.service';

@injectable()
export class JwksUriGetter extends GenericService {
  async get(jwtPayload: DecodedJwtPayload) {
    const { jwks_uri } = await this.getOpenIdConfig(jwtPayload);
    if (!jwks_uri) {
      this.logger.log('no jwksUri in the open id configuration');
      throw new UnauthorizedException();
    }
    return {
      jwksUri: jwks_uri,
    };
  }

  private async getOpenIdConfig(
    jwtPayload: DecodedJwtPayload,
  ): Promise<OpenidConfiguration> {
    const issuer = jwtPayload.iss;
    if (!issuer) {
      this.logger.log('token issuer is null');
      throw new UnauthorizedException();
    }
    const { data } = await axios.get<OpenidConfiguration>(
      Utils.urlJoin(issuer, '.well-known/openid-configuration'),
    );
    return data;
  }
}
