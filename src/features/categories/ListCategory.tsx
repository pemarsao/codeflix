import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { Link } from "react-router-dom";
import { GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { closeSnackbar, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";


export const ListCategory = () => {
    const [rowsPerPage] = useState([10, 25, 50, 100]); 
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [perPage, setPerPage] = useState(paginationModel.pageSize); 
    const [page, setPage] = useState(paginationModel.page);
    const [search, setSearch] = useState("");

    const { data, isFetching, error } = useGetCategoriesQuery({
        page: paginationModel.page,
        perPage: paginationModel.pageSize,
        search,
    });
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const enqueSnackBar = useSnackbar();

    async function handleDelete(id: string) {
        await deleteCategory({ id });
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
        if (deleteCategoryStatus.isSuccess) {
            enqueSnackBar.enqueueSnackbar("Category deleted successfully!", { variant: "success" });
        } else if (deleteCategoryStatus.error) {
            enqueSnackBar.enqueueSnackbar("Failed to delete category.", { variant: "error" });
        }

        if (error) {
            enqueSnackBar.enqueueSnackbar("Failed to fetch categories.", { variant: "error" });
        }
    }, [deleteCategoryStatus, enqueSnackBar, error]);

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
                    New Category
                </Button>

            </Box>
            <CategoriesTable 
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
};