import './App.css';
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import { Header } from './component/Header';
import { Layout } from './component/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';
import { ListCategory } from './features/categories/ListCategory';
import { EditCategory } from './features/categories/EditCategory';
import { CreateCategory } from './features/categories/CreateCategory';
import { SnackbarProvider } from 'notistack';
import { ListCastMember } from './features/cast/ListCastMember';

function App() {

    return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={2000}
        maxSnack={3}
      >
        <Box
          component="main"
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.grey[900],
          }}>

            <Header />
            <Layout>
              <h1>Welcome to React Router!</h1>
              <Routes>
                <Route path="/" element={<ListCategory />} />
                <Route path="/categories" element={<ListCategory />} />
                <Route path="/categories/create" element={<CreateCategory />} />
                <Route path="/categories/edit/:id" element={<EditCategory />} />

                <Route path="/cast-members" element={<ListCastMember />} />

                <Route path="*" element={
                  <Box sx={{ color: "white"}}>
                    <Typography variant="h1" component="h1">404</Typography>
                    <Typography variant="h2" component="h2">Page Not Found</Typography>
                  </Box>
                } />
              </Routes>
            </Layout>
          </Box>
        </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
