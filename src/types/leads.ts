interface LeadsListResponse extends Timestamps {
  id: string;
  lead_number: string;
  name: string;
  phone_number: string;
  email: string;
  status: string;
}

interface LeadsDetails {
  id: string;
  name: string;
  lead_no: string;
  status: {
    pipeline: PipelineStatus[];
    current: number;
  }
  bio: Bio;
  address: Address;
  campaign: Campaign;
  additional_information: {
    [key: string]: string;
  }
}

type PipelineStatus = {
  name: string;
  sequence: number;
};

interface Bio extends Address {
  company_name: string;
  email: string;
  phone_number: string;
  source_data: string;
  npwp_no: string;
  ktp_no: string;
  home_phone_no: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  employee_status: string;
}

type Address = {
  ktp_address: string;
  home_address: string;
}

type Campaign = Timestamps & {
  id: string;
  campaign_number: string;
  campaign_name: string;
  brief: string;
  script: string;
  type: string;
  call_group: string;
  status: string | null;
  plan_start_date: string;
  target_close_date: string;
  category: string;
}