import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from 'src/model/user.model';
import { WebResponse } from 'src/model/web.model';
import { Auth } from 'src/common/auth.decorator';
import { type User } from 'prisma/generated/client';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() registerUserRequest: RegisterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(registerUserRequest);

    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() loginUserRequest: LoginUserRequest,
    //  @Res() res: Response,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(loginUserRequest);

    //  res.setHeader('x-token', result.token || '');
    return {
      data: result,
    };
  }

  @Get('/current')
  @HttpCode(200)
  async getCurrent(@Auth() user: User) {
    const result = await this.userService.get(user);

    return {
      data: result,
    };
  }
  @Patch('/current')
  @HttpCode(200)
  async update(@Auth() user: User, @Body() request: UpdateUserRequest) {
    const result = await this.userService.update(user, request);

    return {
      data: result,
    };
  }

  @Delete('/current')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logout(user);

    return {
      data: true,
    };
  }
}
