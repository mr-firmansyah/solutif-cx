interface ContactList extends Timestamps {
  id: string;
  emails: string[];
  contactNumbers: string[];
  companyId: string;
  lifecycleStage: string;
  buyingRole: string;
  ownerId: string;
  jenisKelamin: string;
  tanggalLahir: string;
  address: string;
  name: string;
  company: string;
  owner: {
    userId: string;
    name: string;
    email: string;
    isActive: boolean;
  }
}