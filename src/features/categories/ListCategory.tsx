import { Box, Button, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

export const ListCategory = () => {
    const categories = useAppSelector(selectCategories);
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
    }));
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'isActive', headerName: 'Active', flex: 1, type: "boolean", renderCell: renderIsActiveCell },
        { field: 'id', headerName: 'Action', flex: 1, renderCell: renderActionsCell },

    ];

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => console.log("clicked")}
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