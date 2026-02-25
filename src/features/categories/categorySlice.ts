import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

const category: Category = {
    id: "f638539b8b164dbe877d937e32df2823",
    name: "Terror",
    description: "Filme / Series de Terror",
    is_active: true,
    created_at: "2026-01-20T10:43:22.924909Z",
    updated_at: "2026-01-20T10:44:37.423301Z",
    deleted_at: null,
}

export const initialState = [
    category,
    {...category, id: "f638539b8b164dbe877d937e32df2821" , name: "Comédia"},
    {...category, id: "f638539b8b164dbe877d937e32df2822" , name: "Drama"},
    {...category, id: "f638539b8b164dbe877d937e32df2824" , name: "Ação"},
    {...category, id: "f638539b8b164dbe877d937e32df2825" , name: "Ficção Científica"},
]

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        createCategory(state, action) {
            state.push(action.payload);
        },
        updateCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCategory(state, action) {
            const index = state.findIndex((category) => category.id === action.payload.id);
            state.splice(index, 1);
        },
    }
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id);
    return category || {
        id: "",
        name: "",
        description: null,
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: null,
    };
};


export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;