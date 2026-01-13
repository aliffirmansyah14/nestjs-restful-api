import { z, ZodType } from 'zod';

export class AddressValidation {
  static CONTACTID: ZodType = z.number();

  static ADDRESSID: ZodType = z.number();

  static REQUEST: ZodType = z.object({
    street: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
    contact_id: this.CONTACTID,
  });
}
