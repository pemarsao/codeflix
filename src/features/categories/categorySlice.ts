import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Results, Result, CategoryParams } from "../../types/Category";

export interface Category {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

const endpointUrl = "categories";

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
    }
}

function createCateforyMutation(category: Category) {
    return {
        url: endpointUrl,
        method: "POST",
        body: category,
    }
}

function updateCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "PUT",
        body: category,
    }
}

function getCategories({page = 1, perPage = 10, search = ""}: CategoryParams) {
    const param = { page, perPage, search, isActive: true }
    return `${endpointUrl}?${parseCategoryParams(param)}`;
}

function getCategoryById(id: string) {
    return `${endpointUrl}/${id}`;
}

function parseCategoryParams(params: CategoryParams) {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.perPage) queryParams.append("perPage", params.perPage.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.isActive !== undefined) queryParams.append("is_active", params.isActive.toString());
    return queryParams.toString();
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"],
        }),
        getCategoryById: query<Category, string>({
            query: getCategoryById,
            providesTags: ["Categories"],
        }),
        createCategory: mutation<Result, Category>({
            query: createCateforyMutation,
            invalidatesTags: ["Categories"],
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: mutation<Result, {id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
    }),
});

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
export const { useGetCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery } = categoriesApiSlice;