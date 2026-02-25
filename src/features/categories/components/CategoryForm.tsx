import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import { Category } from "../categorySlice";

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CategoryForm = ({category, isDisabled, isLoading, handleSubmit, handleChange, handleToggle}: Props) => {

    return (
        <Box p={2}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12}}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Name"
                                        value={category.name}
                                        disabled={isDisabled}
                                        onChange={handleChange} 
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12}}> 
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="description"
                                        label="Description"
                                        value={category.description || ""}
                                        disabled={isDisabled}
                                        onChange={handleChange} 
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12}}> 
                                <FormGroup>
                                    <FormControlLabel
                                        label="Active"
                                        control={
                                            <Switch
                                                name="is_active"
                                                color="secondary"
                                                onChange={handleToggle}
                                                checked={category.is_active}
                                                inputProps={{"aria-label": "controlled"}}
                                            />
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid size={{ xs: 12}}>
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" href="/categories">
                                        Back
                                    </Button>

                                    <Button 
                                        type="submit"
                                        variant="contained" 
                                        color="secondary"
                                        disabled={isDisabled}
                                    >
                                        Save
                                    </Button>

                                </Box>
                            </Grid>
                        </Grid>
                            
                    </form>
                </Box>
    );
}