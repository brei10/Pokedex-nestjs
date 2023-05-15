import { Controller, Get } from '@nestjs/common';
import { ServiceHelloWorld } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly ServiceHelloWorld: ServiceHelloWorld) {}

  // @Get()
  // getHello(): string {
  //   return this.ServiceHelloWorld.sayHello();
  // }
}
