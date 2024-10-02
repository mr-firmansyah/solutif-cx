interface LeadsListResponse extends Timestamps {
  id: string;
  leadNumber: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: string;
}

interface LeadsDetails {
  id: string;
  name: string;
  leadNo: string;
  status: {
    pipeline: PipelineStatus[];
    current: number;
  }
  bio: Bio;
  address: Address;
  campaign: Campaign;
  additionalInformation: {
    [key: string]: string;
  }
}

type PipelineStatus = {
  name: string;
  sequence: number;
};

interface Bio extends Address {
  companyName: string;
  email: string;
  phoneNumber: string;
  sourceData: string;
  npwpNo: string;
  ktpNo: string;
  homePhoneNo: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  employeeStatus: string;
}

type Address = {
  ktpAddress: string;
  homeAddress: string;
}

type Campaign = Timestamps & {
  id: string;
  campaignNumber: string;
  campaignName: string;
  brief: string;
  script: string;
  type: string;
  callGroup: string;
  status: string | null;
  planStartDate: string;
  targetCloseDate: string;
  category: string;
}