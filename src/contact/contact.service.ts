import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ContactRequest, ContactResponse } from 'src/model/contact.model';
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

  async getContacts(): Promise<ContactResponse[]> {
    return await this.prismaService.contact.findMany();
  }

  async create(user: User, request: ContactRequest): Promise<ContactResponse> {
    this.logger.debug(`Create new user ${JSON.stringify(request)}`);

    const createRequest = this.validationService.validate(
      ContactValidation.REQUEST,
      request,
    ) as ContactRequest;

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

  async update(id: number, request: ContactRequest): Promise<ContactResponse> {
    this.logger.debug(
      `Update contact id:${id} ${typeof id} ${JSON.stringify(request)}`,
    );

    const contactId = this.validationService.validate(
      ContactValidation.CONTACTID,
      id,
    ) as number;
    const updateRequest = this.validationService.validate(
      ContactValidation.REQUEST,
      request,
    ) as ContactRequest;

    const result = await this.prismaService.contact.update({
      where: {
        id: contactId,
      },
      data: {
        ...updateRequest,
      },
    });

    return {
      id: result.id,
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
      phone: result.phone,
    };
  }

  async getContactById(id: number): Promise<ContactResponse | string> {
    this.logger.debug(`Get contact id:${id} ${typeof id}`);

    const contactId = this.validationService.validate(
      ContactValidation.CONTACTID,
      id,
    ) as number;

    const result = await this.prismaService.contact.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!result) return 'Contact tidak ditemukan';

    return {
      id: result.id,
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
      phone: result.phone,
    };
  }

  async delete(id: number): Promise<boolean> {
    this.logger.debug(`Delete contact id:${id} ${typeof id} `);
    const contactId = this.validationService.validate(
      ContactValidation.CONTACTID,
      id,
    ) as number;

    try {
      await this.prismaService.contact.delete({
        where: {
          id: contactId,
        },
      });
    } catch (error) {
      return false;
    }

    return true;
  }
}
