import type { Role } from "@/entities/role/model/role-type";

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}
