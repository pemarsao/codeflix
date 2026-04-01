export interface Results {
    current_page: number;
    per_page:     number;
    total:        number;
    items:        CastMember[];
}

export interface Result {
    items: CastMember;
}

export interface CastMember {
    id:        string;
    name:      string;
    type:      Type;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export enum Type {
    Actor = "ACTOR",
    Director = "DIRECTOR",
}

export interface CastMembersParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
}
