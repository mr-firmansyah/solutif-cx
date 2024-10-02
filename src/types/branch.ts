interface BranchList extends Timestamps {
  id: string;
  branch_code: string;
  branch_name: string;
  nama_kota: string;
  provinsi: string;
  kode_pos: string;
  alamat: string;
  has_deleted: boolean;
}