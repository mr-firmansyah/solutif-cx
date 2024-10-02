interface LogsList extends Timestamps {
  id: string;
  reference_name: string;
  reference_id: string;
  actor: string;
  action: string;
  module: string[];
  before: {
    [key: string]: string;
  }
  after: {
    [key: string]: string;
  }
  date: string;
}

interface AttacmentsList extends Timestamps {
  id: string;
  model_id: string;
  model_type: string;
  file_name: string;
  file_size: string;
  file_type: string;
  file_url: string;
  description: string;
}

type SearchParams = {
  per_page: number;
  page: number;
  date_from: string;
  date_to: string;
}