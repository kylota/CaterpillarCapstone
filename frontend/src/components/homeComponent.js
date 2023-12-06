import React from 'react'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    margin: '0 auto',
    textAlign: 'center',
    width: '50%',
    color: theme.palette.text.secondary,
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    margin: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

function Home() {
    return (
        <Box>

            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Grid container spacing={2} backgroundColor="white" margin={'auto'} boxShadow={20}>
                <Grid item xs={2} justifyContent={'center'} alignContent={'center'} boxShadow={30}>
                    <Stack spacing={2} useFlexGap justifyContent={'center'} alignContent={'center'}>
                        <Item>Filter 1</Item>
                        <Item>Filter 2</Item>
                        <Item>Filter 3</Item>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2} backgroundColor="#D3D3D3" border={"10px solid white"}>
                        <Grid item xs={5}>
                            <Card width="80%">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        img="/images/atatHq.jpg"
                                        alt="AT&T Building 1"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            AT&T
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Telecommunications company
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card width="80%">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        img="/images/atatHq.jpg"
                                        alt="AT&T Building 2"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            AT&T
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Telecommunications company
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={7}>
                            <Card width="80%">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        img="/images/atatHq.jpg"
                                        alt="AT&T Building 3"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            AT&T
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Telecommunications company
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home