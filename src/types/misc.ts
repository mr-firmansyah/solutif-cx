interface LogsList extends Timestamps {
  id: string;
  referenceName: string;
  referenceId: string;
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

interface AttachmentsList extends Timestamps {
  id: string;
  modelId: string;
  modelType: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  fileUrl: string;
  description: string;
}

type SearchParams = {
  per_page: number;
  page: number;
  dateFrom: string;
  dateTo: string;
}