interface Contact {
  id?: number;
  phoneNumber: string;
  email: string;
  linkedId?: number;
  linkPrecedence?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

type ApiPayload = Pick<Contact, "phoneNumber" | "email">;

interface ContactResponse {
  contact: {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
  };
}

interface ContactResponseError {
  isError: boolean;
  message: string;
  statusCode: number;
  data?: any;
}

type ServiceResponse = ContactResponse | ContactResponseError;

export { Contact, ApiPayload, ServiceResponse };
