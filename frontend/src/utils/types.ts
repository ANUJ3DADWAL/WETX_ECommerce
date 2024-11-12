export interface UserState {
    user_id: string,
    // username: string,
    first_name: string,
    last_name: string,
}

export interface UserSliceState {
    user: UserState | null,
    token: string | null,
    isAuthenticated: boolean
}

export interface SignupFormData {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export interface LoginFormData {
    email: string,
    password: string,
}

export interface AuthResponse {
    message: string,
    token: string,
    user: UserState,
    // errors?: string[],
}

/*
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Products Table:
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

 */


export interface CategoryState {
    category_id: string,
    category_name: string,
}

export interface ProductResponseBody {
    product_id: bigint,
    category_id: bigint,
    category_name: string,
    product_name: string,
    description: string,
    // price: bigint,
    price: string,
    stock_quantity: number,
    image_url: string,
    // created_at: string
}

export interface ProductState {
    productId: bigint,
    categoryId: bigint,
    categoryName: string,
    productName: string,
    description?: string,
    // price: bigint,
    price: string,
    stockQuantity?: number,
    imageUrl: string,
    rating: RatingProps
    // created_at: string
}

export interface RemoveFromCartBody {
    user_id: string,
    product_id: string,
}

export interface AddToCartBody extends RemoveFromCartBody {
    quantity: number,
}

export type UpdateCartItemBody = AddToCartBody

export interface CartBody extends AddToCartBody {
    cart_id: string;
}

export interface CartItemProps {
    cartId: string,
    userId: string,
    productId: string,
    quantity: number,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    // setTotalPrice: Function,
}


export interface TokenVerifyResponse {
    valid: boolean,
    user: UserState,
    // error?: boolean,
    // message?: string,
}

export interface RatingProps {
    count: number,
    stars: number,
    type?: 'sm' | 'md' | 'lg',
    otherClasses?: string,
}

export interface QuantityChangerProps {
    quantity: number,
    increaseQuantity: () => void,
    decreaseQuantity: () => void,
    disabled?: boolean
}
