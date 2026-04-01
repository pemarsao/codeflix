import { GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from "./castMemberSlice";
import { useSnackbar } from "notistack";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CastMemberTable } from "./components/CastMemberTable";

export const ListCastMember = () => {
    const enqueSnackBar = useSnackbar();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [page, setPage] = useState(paginationModel.page);
    const [perPage, setPerPage] = useState(paginationModel.pageSize);
    const [search, setSearch] = useState("");
    const [rowsPerPage] = useState([10, 25, 50, 100]); 
    const { data, isFetching, error } = useGetCastMembersQuery({
        page: paginationModel.page,
        perPage: paginationModel.pageSize,
        search,
    });

    const [deleteCastMember, deleteCastMemberStatus] = useDeleteCastMemberMutation();

    async function handleDelete(id: string) {
        await deleteCastMember({ id });
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if(filterModel.quickFilterValues?.length) {
            const searchValue = filterModel.quickFilterValues.join("");
            setSearch(searchValue);
        } else {
            setSearch("");
        }
    }

    useEffect(() => {
        if (deleteCastMemberStatus.isSuccess) {
            enqueSnackBar.enqueueSnackbar("Cast member deleted successfully!", { variant: "success" });
        } else if (deleteCastMemberStatus.error) {
            enqueSnackBar.enqueueSnackbar("Failed to delete cast member.", { variant: "error" });
        }
    }, [deleteCastMemberStatus]);

    


    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{marginBottom: "1rem"}}
                >
                    New Cast Member
                </Button>
            </Box>
            <CastMemberTable
                data={data}
                perPage={perPage}
                rowsPerPage={rowsPerPage}
                isFetching={isFetching}
                handleDelete={handleDelete}
                handleFilterChange={handleFilterChange}
                paginationModel={paginationModel}
                onPaginationChange={(model) => {
                    setPaginationModel({...model});
                }}
            />

        </Box>
    );
}