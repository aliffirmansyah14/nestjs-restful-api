import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { WebResponse } from 'src/model/web.model';
import { type User } from 'prisma/generated/client';
import { ContactRequest, ContactResponse } from 'src/model/contact.model';
import { Auth } from 'src/common/auth.decorator';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/')
  @HttpCode(200)
  async searchContacs(): Promise<WebResponse<ContactResponse[]>> {
    const result = await this.contactService.getContacts();

    return {
      data: result,
    };
  }
  @Post('/')
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: ContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.create(user, request);

    return {
      data: result,
    };
  }

  @Get(':contactId')
  @HttpCode(200)
  async getContactById(
    @Param('contactId') contactId: string,
  ): Promise<WebResponse<ContactResponse | undefined>> {
    const result = await this.contactService.getContactById(Number(contactId));

    if (typeof result === 'string')
      return {
        errors: result,
      };

    return {
      data: result,
    };
  }

  @Put(':contactId')
  @HttpCode(200)
  async update(
    @Param('contactId') contactId: string,
    @Body() request: ContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.update(Number(contactId), request);

    return {
      data: result,
    };
  }

  @Delete(':contactId')
  @HttpCode(200)
  async delete(
    @Param('contactId') contactId: string,
  ): Promise<WebResponse<boolean>> {
    const result = await this.contactService.delete(Number(contactId));

    return {
      data: result,
    };
  }
}
