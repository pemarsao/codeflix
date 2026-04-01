import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { Results } from "../../../types/CastMembers";

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

export function CastMemberTable({
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
        { field: 'created_at', headerName: 'Created At', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1, renderCell: renderTypeCell },
        { field: 'id', headerName: 'Action', flex: 1, renderCell: renderActionsCell },

    ];

    function renderTypeCell(rowData: GridRenderCellParams) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
                >
                <Typography>
                    {rowData.value === "ACTOR" ? "Actor" : "Director"}
                </Typography>
            </Box>
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
                <Link style={{ textDecoration: "none"}} to={`/cast-members/edit/${rowData.id}`}>
                    <Typography color="primary">{rowData.value}</Typography>
                </Link>
            </Box>
        );
    }

    function mapDataToGridRows(data: Results) {
        const { items: castMembers } = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type,
            created_at: new Date(castMember.created_at).toLocaleDateString('pt-BR')
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