export interface ProductsResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date;
    updatedAt: Date;
    category: Category;
    quantity?: number;
    remixer: string;
    artist: string;
    thumbnail: string;
    tempo: string;
    audio: string;
    dateAdded: Date;
}

export interface Category {
    id: number;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date;
}

export interface CategoriesResponse {
    id: string;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date;
}
