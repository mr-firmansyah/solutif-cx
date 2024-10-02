interface Timestamps {
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
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
    positionId: string;
    roles: string[];
    permissions: string[];
    branch: {
      id: string;
      branchCode: string;
      branchName: string;
      namaKota: string;
      provinsi: string;
      kodePos: string;
      alamat: string;
      hasDeleted: boolean;
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
type AttachmentsResponse = PaginatedApiResponse<AttachmentsList>;

type PrioritiesResponse = PaginatedApiResponse<PriorityList>;
type BranchesResponse = PaginatedApiResponse<BranchList>;

type UsersResponse = PaginatedApiResponse<UserList>;
