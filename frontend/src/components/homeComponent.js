import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
/*import * as styles from './styles.js';*/
/*import AddEmployee from './addemployeeComponent';*/

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
    const handleButtonClick = () => {
        // Add any logic you need before showing the form
        console.log('Button clicked');
        return (<div>
            {/* Your existing content */}

            {/* Form component */}
            <addemployeeComponent />
        </div>);
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching Employer Data')
                const response = await fetch("http://localhost:4000/home");
                console.log(response)
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching Employer Data:');
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const renderCards = () => {
        if (!data || data.length === 0) {
            console.log("Unable to load employer cards.")
            return <Typography>No data available</Typography>;
        }
        return data.map((item) => (
            <Grid item xs={4} padding={'20px'}>
                <Card key={item.id}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5">{item.companyName}</Typography>
                            <Typography>{item.headquartersAddress}</Typography>
                            <Typography>{item.hasEmployed}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        ));
    };
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
            <Grid container spacing={2} backgroundColor="white" margin={'20 px'} padding={'10px'} boxShadow={20}>
                <Grid item xs={2} justifyContent={'center'} alignContent={'center'} boxShadow={30} style={{ display: 'flex' }}>
                    <Stack spacing={2} useFlexGap justifyContent={'center'} alignContent={'center'} width={'auto'}>
                        <Item>Filter 1</Item>
                        <Item>Filter 2</Item>
                        <Item>Filter 3</Item>
                        <Item>
                            <div>
                                {/*Your existing content */}
                                <button onClick={handleButtonClick}>Add Employee</button>
                            </div>
                        </Item>
                    </Stack>
                </Grid>
                <Grid item xs={10} padding={'20px'}>
                    <Grid container spacing={2} backgroundColor="#D3D3D3" padding={'20px'} border={"10px solid white"}>

                        {renderCards()}

                    </Grid></Grid>
            </Grid>



        </Box>

    );
}

export default Home