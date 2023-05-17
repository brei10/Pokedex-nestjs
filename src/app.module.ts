import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServiceHelloWorld } from './app.service';
import { AppController } from './app.controller';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot('mongodb+srv://BREI10:Breiner1003@cluster0.brlewbd.mongodb.net/'),
    ConfigModule.forRoot(),
    SeedModule,
    CommonModule,
    
  ],
  controllers: [AppController],
  providers: [ServiceHelloWorld, SeedService],
})
export class AppModule {}
