import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ContactResponse, CreateContactRequest } from 'src/model/contact.model';
import { ContactValidation } from './contact.validation';
import { User } from 'prisma/generated/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ContactService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async getContacts() {
    return await this.prismaService.contact.findMany();
  }

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(`Create new user ${JSON.stringify(request)}`);

    const createRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    ) as CreateContactRequest;

    const result = await this.prismaService.contact.create({
      data: { username: user.username, ...createRequest },
    });

    return {
      id: result.id,
      first_name: result.first_name,
      email: result.email,
      last_name: result.last_name,
      phone: result.phone,
    };
  }
}
