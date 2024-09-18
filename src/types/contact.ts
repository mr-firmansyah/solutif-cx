interface ContactListResponse extends Timestamps {
  id: string;
  emails: string[];
  contact_numbers: string[];
  company_id: string;
  lifecycle_stage: string;
  buying_role: string;
  owner_id: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  address: string;
  name: string;
  company: string;
  owner: {
    user_id: string;
    name: string;
    email: string;
    is_active: boolean;
  }
}