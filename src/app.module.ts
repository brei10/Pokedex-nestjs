import { join } from 'path';
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceHelloWorld } from './app.service';
import { AppController } from './app.controller';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';


@Module({ 
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration  ],
      validationSchema: Joi.object({
        MONGO_URI: Joi.required(),
        PORT: Joi.number().required(),
    })
      
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PokemonModule,
    SeedModule,
    CommonModule,
    
  ],
  controllers: [AppController],
  providers: [ServiceHelloWorld],
  exports:[ ConfigModule ]
})
export class AppModule {}


