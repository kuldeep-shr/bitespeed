interface Contact {
  id?: number;
  phoneNumber: string;
  email: string;
  linkedId?: number;
  linkPrecedence?: string;
}

type ApiPayload = Pick<Contact, "phoneNumber" | "email">;

export { Contact, ApiPayload };
