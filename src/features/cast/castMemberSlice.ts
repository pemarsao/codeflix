import { apiSlice } from "../api/apiSlice";
import { Results, CastMembersParams, CastMember, Type, Result } from "../../types/CastMembers";

const endpointUrl = "cast_members";

export const initialState: CastMember = {
    id: "",
    name: "",
    type: Type.Actor,
    created_at: "",
    updated_at: "",
    deleted_at: "",
};

function parseCastMembersParams(params: CastMembersParams) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.perPage) query.append("per_page", params.perPage.toString());
    if (params.search) query.append("search", params.search);
    if (params.type) query.append("type", params.type);
    return query.toString();
}

function getCastMembers(params: CastMembersParams) {
    const {page = 0, perPage = 10, search, type} = params;
    return `${endpointUrl}?${parseCastMembersParams({page, perPage, search, type})}`;
}

function deleteCastMember(id: {id: string}) {
    return {
        url: `${endpointUrl}/${id}`,
        method: "DELETE",
    }
}

function createCastMember(castMember: CastMember) {
    return {
        url: endpointUrl,
        method: "POST",
        body: castMember,
    }
}

function updateCastMember(castMember: CastMember) {
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: "PUT",
        body: castMember,
    }
}

function getCastMemberById(id: {id: string}) {
    return `${endpointUrl}/${id}`;
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCastMembers: query<Results, CastMembersParams>({
            query: getCastMembers,
            providesTags: ["CastMembers"],
        }),
        deleteCastMember: mutation<Result, {id: string}>({
            query: deleteCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        createCastMember: mutation<Result, CastMember>({
            query: createCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        getCastMemberById: query<CastMember, {id: string}>({
            query: getCastMemberById,
            providesTags: ["CastMembers"],
        }),
    }),
});

export default castMemberApiSlice.reducer;

export const { useGetCastMembersQuery, useDeleteCastMemberMutation, useCreateCastMemberMutation, useUpdateCastMemberMutation, useGetCastMemberByIdQuery } = castMemberApiSlice;