interface User {
  id: string;
  name: string;
}

interface Person {
  id: string;
  user_id: string;
  task_id: string;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  first_name?: string;
  last_name?: string;
  name?: string;
}

export interface Task {
  id: string;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  priority_id: string;
  contact_id: string;
  model_type: string;
  model_id: string;
  created_at: string;
  updated_at: string;
  people: Person[];
  contact: Contact;
}