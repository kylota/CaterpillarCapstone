import React, { useEffect, useState } from 'react'
import TreeDiagram from './digraphComponent.js';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
/*import { styled, alpha } from '@mui/material/styles';*/
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
//import * as styles from './styles.js';
//import AddEmployee from './addemployeeComponent';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    margin:'0 auto',
    textAlign: 'center',
    width:'50%',
    color: theme.palette.text.secondary,
  }));

  const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '50%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
  //const SearchIconWrapper = styled('div')(({ theme }) => ({
  //  padding: theme.spacing(0, 2),
  //  height: '100%',
  //  position: 'absolute',
  //  pointerEvents: 'none',
  //  display: 'flex',
  //  alignItems: 'center',
  //  justifyContent: 'center',
  //}));

function Home( {onLogout} ) {
  const [cards, setCards] = useState([]);
  const [showTree, setShowTree] = useState(false);
  const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleButtonClick = () => {
        // Add any logic you need before showing the form
        console.log('Button clicked');
        return (<div>
            {/* Your existing content */}

            {/* Form component */}
            <addemployeeComponent />
        </div>);
    }
    
  const clearCards = () => {
    setCards([]);
  };

  const handleSearch = async () => {
    try {
      console.log(query);
      const response = await fetch('http://localhost:4000/home/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        
      });

      const cards = await response.json();
      console.log(cards)
      clearCards();
      setCards(cards);
      renderCards();

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/landing');
  };

  const handleCardClick = (employeeID) => {
    console.log("Clicked on card with employee ID:", employeeID);
    setShowTree(true);
    navigate(`/tree/${employeeID}`, { state: { showTree: true } });
  };

  const renderCards = () => {
      if (!cards || cards.length === 0) {
          console.log("Unable to load employer cards.")
          return <Typography>No data available</Typography>;
      }
      return cards.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.employerID} style={{ padding: '10px' }}>
          <Card
            key={item.employerID}
            onClick={() => {
              console.log("Employee ID:", item.employerID);
              handleCardClick(item.employerID); // Pass item.employerID here
            }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log('Fetching Employer Data')
            const response = await fetch("http://localhost:4000/home");
            console.log(response)
            const result = await response.json();
            setCards(result);
            console.log(result)
        } catch (error) {
            console.error('Error fetching Employer Data:');
            console.log(error);
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
        if (event.state && event.state.showTree) {
            setShowTree(true);
        } else {
            setShowTree(false);
        }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Box>
      {showTree ? (
        <TreeDiagram />
      ) : (
        <>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2} style={{paddingBottom: '10px', paddingRight: '10px'}}>
            <Grid container  justifyContent={"center"}>
              {/*Search*/}
              <Grid item >
                <StyledSearch width={"50%"} border={"10px solid black"}>
                  <StyledInputBase width={"50%"} border={"10px solid black"}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button variant="contained" onClick={handleSearch} endIcon={<SearchIcon />}>
                    Search
                  </Button>
                </StyledSearch>
              </Grid>
              {/*Logout Button*/}
              <Grid item>
                <Button onClick={handleLogout} variant="contained" color="primary">
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} backgroundColor="white" margin={'20 px'} padding={'10px'} boxShadow={20}>
            {/* Filters */}
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
            {/* Cards */}
            <Grid item xs={10} style={{ padding: '20px' }}>
              <Grid container spacing={1} style={{ backgroundColor: "#D3D3D3", padding: 'px', border: "10px solid white", height: '100%', boxSizing: 'border-box' }}>
                {renderCards()}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}   
    </Box>
  );
}

export default Home
