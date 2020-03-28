export interface Product {
    uid: string;
    title: string;
    price: number;
    category: string;
    imageURL: string;
    // helps compile time check and documenting code qm
}