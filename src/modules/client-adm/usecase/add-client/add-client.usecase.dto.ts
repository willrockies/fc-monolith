export interface AddClientInputDto {
    id?: string
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AddClientOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}