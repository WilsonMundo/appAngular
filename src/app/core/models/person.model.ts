export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt?: string | null;
}

export interface PersonCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    createdBy: number;
}