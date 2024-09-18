interface TicketListResponse extends Timestamps {
  assignee_data: string;
  ticket_id: string;
  ticket_code: string;
  subject: string;
  description: string;
  priority: string;
  status: number;
  target_resolution_date: string;
  company: {
    company_id: string;
    name: string;
  };
  project: {
    project_id: string;
    name: string;
  };
  contact: {
    id: string;
    name: string;
  };
  category: {
    category_id: string;
    name: string;
  };
}