import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { selectCategoryById } from "./categorySlice";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";

export const EditCategory = () => {
    const id = useParams().id || "";
    const category = useAppSelector((state) => selectCategoryById(state, id));
    const [isDisabled, setIsDisabled] = useState(false);
    const handleChange = (e: any) => {};
    const handleToggle = (e: any) => {};
    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography> 
                    </Box>
                </Box>

                <CategoryForm
                    category={category}
                    isDisabled={isDisabled}
                    isLoading={false}
                    onSubmit={() => {}}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    );
};