export class ContactResponse {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}

export class ContactRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
