export type UserStatus = "active" | "inactive";

export const USER_STATUSES: UserStatus[] = ["active", "inactive"];

export interface UserInput {
    name?: string;
    email?: string;
    phoneNumber?: string;
    status?: UserStatus;
}

export interface UpdateUserStatusInput {
    status: UserStatus;
}

export interface UserInputMain extends UserInput {
    
    Address: string;
}
