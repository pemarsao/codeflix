import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const CreateCategory = () => {
    const [createCategory, status] = useCreateCategoryMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: "",
    });
    const enqueSnackBar = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await createCategory(categoryState);
    }

    useEffect(() => {
        if (status.isLoading) {
            setIsDisabled(true);
            enqueSnackBar.enqueueSnackbar("Category created successfully!", { variant: "success" });
        }
        
        if (status.isError) {
            setIsDisabled(false);
            enqueSnackBar.enqueueSnackbar("Failed to create category!", { variant: "error" });
        }
    }, [status.isLoading, status.isError, enqueSnackBar]);


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
                        <Typography variant="h4">Create Category</Typography> 
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