import { injectable } from '@auth/di';
import {
  ConfigurationServicePort,
  InternalServerErrorException,
} from '@auth/domain';

@injectable()
export class PrivateKeyGetter {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  get() {
    const privateKeys = this.configurationService.get('jwks.privateKeys');
    const privateKeyKid = this.configurationService.get(
      'jwt.sign.privateKeyKid',
    );
    const privateKey = privateKeys.find((key) => key.kid === privateKeyKid);
    if (!privateKey) {
      throw new InternalServerErrorException();
    }
    return privateKey;
  }
}
