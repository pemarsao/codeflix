import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { closeSnackbar, useSnackbar } from "notistack";
import { useEffect } from "react";

export const ListCategory = () => {
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const enqueSnackBar = useSnackbar();
    const rows: GridRowsProp = data ? data?.items.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
    }))
    : [];
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'isActive', headerName: 'Active', flex: 1, type: "boolean", renderCell: renderIsActiveCell },
        { field: 'id', headerName: 'Action', flex: 1, renderCell: renderActionsCell },

    ];

    async function handleDelete(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueSnackBar.enqueueSnackbar("Category deleted successfully!", { variant: "success" });
        } else if (deleteCategoryStatus.error) {
            enqueSnackBar.enqueueSnackbar("Failed to delete category.", { variant: "error" });
        }
    }, [deleteCategoryStatus, enqueSnackBar]);

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    function renderActionsCell(params: GridRenderCellParams) {
    
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
            >
                <Link style={{ textDecoration: "none"}} to={`/categories/edit/${rowData.id}`}>
                    <Typography color="primary">{rowData.value}</Typography>
                </Link>
            </Box>
        );
    }


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

            <Box sx={{ display: "flex", height: 600}}>
                <DataGrid 
                    showToolbar
                    disableColumnFilter
                    disableColumnSelector
                    pageSizeOptions={[2, 5, 10, 25, 50, 100]}
                    rows={rows} 
                    columns={columns} 
                />
            </Box>
        </Box>
    );
};