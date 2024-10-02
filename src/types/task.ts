interface User {
  id: string;
  name: string;
}

interface Person {
  id: string;
  userId: string;
  taskId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface Task {
  id: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  priorityId: string;
  contactId: string;
  modelType: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
  people: Person[];
  contact: Contact;
}