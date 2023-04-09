import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { C2E_MODULES } from 'modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        emitTypenameField: true
      }
    }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.PREFIX === 'api'
          ? './env/.production.env'
          : process.env.PREFIX === 'api-beta'
          ? './env.beta.env'
          : './env/.dev.env',
      isGlobal: true
    }),
    ...C2E_MODULES
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
