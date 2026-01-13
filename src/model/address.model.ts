export class AddressRequest {
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
  postal_code: string;
}
export type ContactIdType = {
  contact_id: number;
};

export class AddressResponse {
  id: number;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
  postal_code: string;
}
