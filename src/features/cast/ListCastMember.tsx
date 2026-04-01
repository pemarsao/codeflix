import { GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useGetCastMembersQuery } from "./castMemberSlice";

export const ListCastMember = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10); 
    const [search, setSearch] = useState("");
    const [rowsPerPage] = useState([10, 25, 50, 100]); 
    const { data, isFetching, error } = useGetCastMembersQuery({
        page,
        perPage,
        search,
    });

    function handleFilterChange(filterModel: GridFilterModel) {
        if(filterModel.quickFilterValues?.length) {
            const searchValue = filterModel.quickFilterValues.join("");
            setSearch(searchValue);
        } else {
            setSearch("");
        }
    }

    useEffect(() => {
        if (error) {
            console.error("Failed to fetch cast members:", error);
        }
    }, [error]);

    


    return (
        <div>List Cast Member</div>
    );
}