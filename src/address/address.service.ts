import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  AddressRequest,
  AddressResponse,
  ContactIdType,
} from 'src/model/address.model';
import { AddressValidation } from './address.validation';

@Injectable()
export class AddressService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validtionService: ValidationService,
  ) {}

  async hello() {
    return await this.prismaService.address.findMany({
      where: {
        contact_id: 1,
      },
    });
  }

  async create(
    contactId: number,
    request: AddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(
      `Create address contactId:${contactId} ${typeof contactId} ${JSON.stringify(request)}`,
    );
    const createAddressRequest = this.validtionService.validate(
      AddressValidation.REQUEST,
      {
        ...request,
        contact_id: contactId,
      },
    ) as AddressRequest & ContactIdType;

    const result = await this.prismaService.address.create({
      data: createAddressRequest,
    });

    return {
      id: result.id,
      street: result.street,
      city: result.city,
      country: result.country,
      province: result.province,
      postal_code: result.postal_code,
    };
  }

  async getAddressById(
    contactId: string,
    addressId: string,
  ): Promise<AddressResponse | null> {
    this.logger.debug(
      `Getcontacts address contactId:${contactId}  addressId:${addressId}}`,
    );
    const contact_id = this.validtionService.validate(
      AddressValidation.CONTACTID,
      Number(contactId),
    ) as number;

    const address_id = this.validtionService.validate(
      AddressValidation.ADDRESSID,
      Number(addressId),
    ) as number;

    const result = await this.prismaService.address.findFirst({
      where: {
        contact_id: contact_id,
        AND: {
          id: address_id,
        },
      },
    });

    return result
      ? {
          id: result.id,
          street: result.street,
          city: result.city,
          country: result.country,
          province: result.province,
          postal_code: result.postal_code,
        }
      : null;
  }
}
