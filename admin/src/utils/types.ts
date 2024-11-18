export interface AdminSliceState {
    admin: AdminState | null,
    token: string | null,
    isAuthenticated: boolean,
}

export interface AdminState {
    admin_id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface Product {
    product_id: number;
    category_id: number;
    product_name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    image_url?: string;
    created_at: Date;
    category_name: string;
}
