import { PrivateKeyGetter } from '@auth/application';
import { ConfigurationServicePort } from '@auth/domain';
import { Global, InternalServerErrorException, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      extraProviders: [PrivateKeyGetter],
      inject: [ConfigurationServicePort, PrivateKeyGetter],
      useFactory: (
        configurationService: ConfigurationServicePort,
        privateKeyGetter: PrivateKeyGetter,
      ) => {
        const privateKey = privateKeyGetter.get();
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
