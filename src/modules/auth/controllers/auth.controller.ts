import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get('/test')
  async test() {}
}
