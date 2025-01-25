export interface User {
  userId: number;
  name: string;
  employeeNum: number;
  department: string;
  avartaId: number;
  level: string;
}

export interface UserApiResponse {
  status: string;
  message: string;
  responseDto: User[];
}
