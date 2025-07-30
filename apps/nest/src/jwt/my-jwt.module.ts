import { ConfigurationServicePort } from '@auth/domain';
import { Global, InternalServerErrorException, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigurationServicePort],
      useFactory: (configurationService: ConfigurationServicePort) => {
        const privateKeys = configurationService.get('jwt.sign.private_keys');
        const privateKey = privateKeys[0];
        if (!privateKey) {
          throw new InternalServerErrorException(
            'no private jwk key setted in .evn file',
          );
        }

        const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] = (
          requestType,
          tokenOrPayload,
        ) => {
          if (requestType === JwtSecretRequestType.SIGN) {
            return privateKey.pem;
          }
          if (requestType === JwtSecretRequestType.VERIFY) {
            const token = tokenOrPayload as string;
            console.log('secretOrKeyProvider verify token : ', token);
            // TODO : get from jwks endpoint
            throw new InternalServerErrorException('dont use that');
          }
          throw new InternalServerErrorException('impossible request type');
        };

        const signOptions = {
          expiresIn: configurationService.get(
            'jwt.sign.access_token.expiration',
          ),
          issuer: configurationService.get('jwt.sign.issuer'),
          audience: configurationService.get('jwt.sign.audiences'),
          algorithm: privateKey.alg,
          keyid: privateKey.kid,
        };

        const verifyOptions = {
          algorithms: configurationService.get(
            'jwt.verify.authorizedAlgorithms',
          ),
          audience: configurationService.get('jwt.verify.authorizedAudiences'),
          issuer: configurationService.get('jwt.verify.authorizedIssuers'),
          ignoreExpiration: false,
        };

        return {
          secretOrKeyProvider,
          signOptions,
          verifyOptions,
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class MyJwtModule {}
