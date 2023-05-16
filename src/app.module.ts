import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServiceHelloWorld } from './app.service';
import { AppController } from './app.controller';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot('mongodb+srv://BREI10:Breiner1003@cluster0.brlewbd.mongodb.net/'),
     ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [ServiceHelloWorld],
})
export class AppModule {}
