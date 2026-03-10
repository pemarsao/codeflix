import { GridFilterModel } from "@mui/x-data-grid";
import { Results } from "../../../types/Category";

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
}: Props) {}