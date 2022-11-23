import React from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'

const Header = () => {

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Conceptor
                    </Typography>
                    {window.location.pathname == '/' && !Cookie.get('token_user') && !Cookie.get('token_leads') && (
                        <Button component={Link} color="inherit" to="/login">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header