import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { User } from 'prisma/generated/client';
// import { DtoService } from 'src/common/dto.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    //  private dtoService: DtoService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    // logger new reqister
    this.logger.debug(`Register new user ${JSON.stringify(request)}`);
    // validasi dengna zod dengan schema di uservalidation class
    const registerRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    ) as RegisterUserRequest;

    //  check username udah ada apa belum
    const usernameIsExist = await this.prismaService.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    //  jika ada throw error http
    if (usernameIsExist !== 0)
      throw new HttpException('Username sudah digunakan', 400);

    //  hash password dengan bcrypt
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const userCreated = await this.prismaService.user.create({
      data: registerRequest,
    });
    //  const userDTO = this.dtoService.convert(userCreated, [
    //    'name',
    //    'username',
    //    'password',
    //  ]);
    return {
      name: userCreated.name,
      username: userCreated.username,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    // logger login
    this.logger.debug(`UserService.login (${JSON.stringify(request)})`);
    //  validate with zod
    const loginRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    ) as LoginUserRequest;

    //  check jika user ada
    let user = await this.prismaService.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });
    //  throw error user invalid
    if (!user) throw new HttpException('username atau password salah', 401);

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid)
      throw new HttpException('username atau password salah', 401);

    user = await this.prismaService.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });
    return {
      username: user.username,
      name: user.name,
      token: user.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    return {
      name: user.name,
      username: user.name,
      token: user.token,
    };
  }
  async findAll() {
    return await this.prismaService.user.findMany();
  }
}
