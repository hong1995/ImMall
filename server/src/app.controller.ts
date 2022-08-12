import {
  Controller,
  Get,
  Header,
  Param,
  Req,
  Res,
  Response,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  //API WELCOME PAGE
  @Get()
  getHello(): string {
    const apiDocs = `http://localhost:${process.env.PORT}/api-docs`;
    return `<div><H1>ImMall Backend API</H1></div>Welcome to visit the ImMall Backend API Home.<br>Please click <a href=${apiDocs}>here</a> want to see the api-docs.`;
  }
}

