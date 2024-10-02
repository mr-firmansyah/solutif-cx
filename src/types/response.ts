interface Timestamps {
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

interface ApiResponse<T> {
  error: boolean;
  status: string;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  totalElements: number;
  totalPage: number;
  isLastPage: boolean;
  page: number;
  size: number;
  data: T[];
}

type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    position_id: string;
    roles: string[];
    permissions: string[];
    branch: {
      id: string;
      branch_code: string;
      branch_name: string;
      nama_kota: string;
      provinsi: string;
      kode_pos: string;
      alamat: string;
      has_deleted: boolean;
    };
  };
  token: string;
}

type UserResponse = ApiResponse<LoginResponse>;
type TicketsResponse = PaginatedApiResponse<TicketListResponse>;
type ContactsResponse = PaginatedApiResponse<ContactListResponse>;

type LeadsDetailsResponse = ApiResponse<LeadsDetails>;
type LeadsResponse = PaginatedApiResponse<LeadsListResponse>;

type LogsResponse = PaginatedApiResponse<LogsList>;
type AttachmentsResponse = PaginatedApiResponse<AttacmentsList>;

type PrioritiesResponse = PaginatedApiResponse<PriorityList>;
type BranchesResponse = PaginatedApiResponse<BranchList>;

type UsersResponse = PaginatedApiResponse<UserList>;
