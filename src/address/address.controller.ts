import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressRequest, AddressResponse } from 'src/model/address.model';
import { WebResponse } from 'src/model/web.model';
import { Address } from 'prisma/generated/client';

@Controller('/api/contacts')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('/address/hello')
  @HttpCode(200)
  async hello(): Promise<WebResponse<Address[]>> {
    const result = await this.addressService.hello();
    return {
      data: result,
    };
  }

  @Post(':contactId/address')
  @HttpCode(200)
  async create(
    @Param('contactId') contactId: string,
    @Body() request: AddressRequest,
  ): Promise<WebResponse<AddressResponse>> {
    const result = await this.addressService.create(Number(contactId), request);

    return {
      data: result,
    };
  }
}
