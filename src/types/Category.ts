export interface Results {
    current_page: number;
    per_page:     number;
    total:        number;
    items:        Category[];
}

export interface Result {
    item:        Category;
}

export interface Category {
    id:          string;
    name:        string;
    description: string;
    is_active:   boolean;
    created_at:  string;
    updated_at:  string;
    deleted_at:  string;
}

export interface CategoryParams {
    perPage?: number;
    search?: string;
    page?: number;
    isActive?: boolean;
}