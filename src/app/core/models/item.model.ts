export interface Item {
    id: number;
    name: string;
    price: number;
    createdAt: string;
    updatedAt?: string | null;
}

export interface ItemCreateDto {
    name: string;
    price: number;
    createdBy: number;
}