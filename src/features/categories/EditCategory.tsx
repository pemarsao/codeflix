import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Category, selectCategoryById, updateCategory, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "./categorySlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const EditCategory = () => {
    const id = useParams().id || "";
    const { data: category, isFetching } = useGetCategoryByIdQuery(id);
    const [isDisabled, setIsDisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        description: null,
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: null,
    });
    const enqueSnackBar = useSnackbar();

    useEffect(() => {
        if (category) {
            setCategoryState(category);
        }
    }, [category]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateCategory(categoryState);
        enqueSnackBar.enqueueSnackbar("Category updated successfully!", { variant: "success" });
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({...categoryState, [name]: value});
    };
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoryState({...categoryState, [name]: checked});
    }
    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography> 
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isDisabled={isDisabled}
                    isLoading={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    );
};