export class AddressRequest {
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
  postal_code?: string | null;
}
export type ContactIdType = {
  contact_id: number;
};

export class AddressResponse {
  id: number;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country?: string | null;
  postal_code?: string | null;
}
