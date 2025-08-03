import { injectable } from '@auth/di';
import { ConfigurationServicePort } from '@auth/domain';
import { InternalServerErrorException } from '@auth/domain';

@injectable()
export class PrivateKeyGetter {
  constructor(
    private readonly configurationService: ConfigurationServicePort,
  ) {}

  get() {
    const privateKeys = this.configurationService.get('jwt.sign.private_keys');
    const privateKey = privateKeys[0];
    if (!privateKey) {
      throw new InternalServerErrorException(
        'no private jwk key setted in .evn file',
      );
    }
    return privateKey;
  }
}
