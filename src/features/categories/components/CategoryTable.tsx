import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";

type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    paginationModel: GridPaginationModel;
    onPaginationChange: (model: GridPaginationModel) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleDelete: (id: string) => void;
};

export function CategoriesTable({
    data,
    perPage,
    isFetching,
    rowsPerPage = [2, 5, 10, 25, 50, 100],
    paginationModel,
    onPaginationChange,
    handleFilterChange,
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

    function mapDataToGridRows(data: Results) {
        const { items: categories } = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            isActive: category.is_active,
            createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
        }));
    }

    const rows = data ? mapDataToGridRows(data) : [];
    const rowCount = data ? data.total : 0;

    return (
        <Box sx={{ display: "flex", height: 600}}>
            <DataGrid 
                showToolbar
                disableColumnFilter
                disableColumnSelector
                pageSizeOptions={rowsPerPage}
                filterMode="server"
                paginationMode="server"
                rows={rows} 
                rowCount={rowCount}
                loading={isFetching}
                columns={columns}
                onFilterModelChange={handleFilterChange}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationChange}
                initialState={
                    {
                        pagination: {
                            paginationModel: { pageSize: paginationModel.pageSize },
                        },
                    }
                 }
            />
        </Box>
    );
}