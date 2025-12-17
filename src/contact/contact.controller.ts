import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { WebResponse } from 'src/model/web.model';
import { Contact, type User } from 'prisma/generated/client';
import { ContactResponse, CreateContactRequest } from 'src/model/contact.model';
import { Auth } from 'src/common/auth.decorator';

@Controller('/api/contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/')
  @HttpCode(200)
  async getContacts(): Promise<WebResponse<Contact[]>> {
    const result = await this.contactService.getContacts();

    return {
      data: result,
    };
  }
  @Post('/')
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateContactRequest,
  ): Promise<WebResponse<ContactResponse>> {
    const result = await this.contactService.create(user, request);

    return {
      data: result,
    };
  }
}
