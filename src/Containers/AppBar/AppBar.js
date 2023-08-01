import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function NavigationBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <FormControlLabel
                        control={<Switch color="warning" />}
                        label="Favorites Only"
                        onClick={props.showFavorites} />
                    <Box sx={{ marginLeft: 'auto' }}>
                        {props.languageFilters.map(language =>
                            <FormControlLabel
                                control={<Switch color="warning" />}
                                label={language}
                                key={language}
                                checked={props.currentFilter === language}
                                onClick={(event) => props.handleFilter(event, language)}
                            />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}