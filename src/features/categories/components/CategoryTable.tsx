import { GridColDef, GridFilterModel, GridRenderCellParams } from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number;

    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
};

export function CategoriesTable({
    data,
    perPage,
    isFetching,
    rowsPerPage = 10,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,
}: Props) {

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
}