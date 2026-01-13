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
import { AddressService } from './address.service';
import { AddressRequest, AddressResponse } from 'src/model/address.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/contacts')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get(':contactId/address')
  @HttpCode(200)
  async getAddress(
    @Param('contactId') contactId: string,
  ): Promise<WebResponse<AddressResponse[]>> {
    const result = await this.addressService.getAddresses(contactId);
    return {
      data: result,
    };
  }

  @Post(':contactId/addresses')
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

  @Get(':contactId/addresses/:addressId')
  @HttpCode(200)
  async getAddressById(
    @Param('contactId') contactId: string,
    @Param('addressId') addressId: string,
  ): Promise<WebResponse<AddressResponse | null>> {
    const result = await this.addressService.getAddressById(
      contactId,
      addressId,
    );
    return {
      data: result,
    };
  }

  @Put(':contactId/addresses/:addressId')
  @HttpCode(200)
  async update(
    @Param('contactId') contactId: string,
    @Param('addressId') addressId: string,
    @Body() request: AddressRequest,
  ): Promise<WebResponse<AddressResponse | null>> {
    const result = await this.addressService.updateAddress(
      contactId,
      addressId,
      request,
    );
    return {
      data: result,
    };
  }

  @Delete(':contactId/addresses/:addressId')
  @HttpCode(200)
  async delete(
    @Param('contactId') contactId: string,
    @Param('addressId') addressId: string,
  ): Promise<WebResponse<boolean>> {
    const result = await this.addressService.deleteAddress(
      contactId,
      addressId,
    );
    return {
      data: result,
    };
  }
}
