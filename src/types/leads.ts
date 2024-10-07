interface LeadsList extends Timestamps {
  id: string;
  leadNumber: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: string;
  type: string;
  campaignName: string; 
}

interface LeadsDetails {
  id: string;
  name: string;
  leadNo: string;
  status: PipelineStatus;
  bio: Bio;
  address: Address;
  campaign: Campaign;
  profile: Profile;
  qcInformation: QcInformation;
  additionalInformation: {
    [key: string]: string;
  } | null;
}

interface Status {
  name: string;
  sequence: number;
};

interface PipelineStatus {
  pipeline: Status[];
  current: number;
}

interface Bio extends Address, Profile {
  nama: string;
  sourceData: string;
  namaCampaign: string;
  brief: string;
  script: string;
  planStartDate: string;
  targetCloseDate: string;
  kategoriCampaign: string;
  tipeCampaign: string;
  title: string;
  deskripsi: string;
  nominal: string;
  noTelp: string;
  tipeLead: string;
  npwpNo: string;
  ktpNo: string;
  homePhoneNo: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  employeeStatus: string;
  productName: string;
  brandName: string;
  typeName: string;
  modelName: string;
  year: string;
  collateralStatus: string;
  tanggalLunas: Date;
  angsuran: string;
  jumlahCicilan: string;
  marketPrice: string;
  netPencairan: string;
  sisaDenda: string;
  sisaTenor: string;
  sisaPokokHutang: string;
  timeZone: string;
  phoneNo2: string;
  phoneNo3: string;
  agama: string;
  pekerjaan: string;
  penghasilan: string;
  statusPerkawinan: string;
  namaGadisIbuKandung: string;
}

interface Address {
  ktpAddress: string;
  homeAddress: string;
}

interface Profile {
  email: string;
  phoneNo: string;
  companyName: string;
  address: string;
}

type Campaign = Timestamps & {
  id: string;
  campaignNumber: string;
  campaignName: string;
  brief: string;
  script: string;
  type: string;
  callGroup: string;
  status: null;
  planStartDate: Date;
  targetCloseDate: Date;
  category: string;
}

interface QcInformation {
  qcStatus: string | null;
  surveyDate: string | null;
  surveyTime: string | null;
}