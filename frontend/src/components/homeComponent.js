import React, { useEffect, useState } from "react";
import TreeDiagram from "./digraphComponent.js";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Checkbox } from "@mui/material";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DateField from "@mui/material/TextField";
import BooleanField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import FormControlLabel from "@mui/material/FormControlLabel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  margin: "0 auto",
  textAlign: "center",
  width: "100%",
  color: theme.palette.text.secondary,
  position: "sticky",
  top: 0,
}));

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  padding: theme.spacing(0, 0),
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
}));

const isAdmin = localStorage.getItem('isAdmin') === 'true';
console.log(isAdmin)


function Home({ onLogout }) {
  const [cards, setCards] = useState([]);
  const [showTree, setShowTree] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addData, setAddData] = useState({
    companyName: '',
    headquartersAddress: "",
    parentCompany: "",
    industry: "",
    hasMerged: false,
    incorporationDate: undefined,
    dissolutionDate: undefined,
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    companyName: "",
    industry: "",
    headquartersAddress: "",
    hasEmployed: "",
  });
  const [editingEmployerID, setEditingEmployerID] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingEmployerID, setDeletingEmployerID] = useState(null);

  const clearCards = () => {
    setCards([]);
  };

  const handleSearch = async () => {
    try {
      console.log(query);
      const response = await fetch("http://localhost:4000/home/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const cards = await response.json();
      console.log(cards);
      clearCards();
      setCards(cards);
      renderCards();
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/landing");
  };

  const handleCardClick = (employeeID) => {
    console.log("Clicked on card with employee ID:", employeeID);
    setShowTree(true);
    navigate(`/tree/${employeeID}`, { state: { showTree: true } });
  };

  const handleEdit = (employerID, event) => {
    event.stopPropagation();
    console.log("Editing " + employerID);

    setEditingEmployerID(employerID);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditingEmployerID(null);
  };
  const handleMenuToggle = (event, employerID) => {
    event.stopPropagation();
    setHoveredCard(hoveredCard === employerID ? null : employerID);

    setIsMenuOpen((prevMenuState) => ({
      ...prevMenuState,
      [employerID]: !prevMenuState[employerID],
    }));
  };
  const handleDeleteDialog = (employerID, event) => {
    event.stopPropagation();
    setDeletingEmployerID(employerID);
    setDeleteDialogOpen(true);
  };

  // const renderEditFunctionality = (employerID) => {
  //   if (isAdmin) {
  //     return (
  //       <IconButton
  //         style={{ color: "#035AA6" }}
  //         onClick={(e) => handleEdit(employerID, e)}
  //       >
  //         <EditIcon />
  //       </IconButton>
  //     );
  //   }
  //   return null;
  // };



  const handleConfirmDelete = async (employerID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/home/delete/${employerID}`,
        {
          method: "DELETE",
        }
      );
      console.log(employerID);

      if (response.ok) {
        console.log("Employer deleted successfully");
        setDeleteDialogOpen(false);
        window.location.reload();
      } else {
        console.error("Error deleting employer:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
  };
  const handleAdd = () => {
    if (addDialogOpen) {
      setAddDialogOpen(false);
    } else {
      setAddDialogOpen(true);
    }
    console.log("Toggle Add Employer Form");
  };
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const renderCards = () => {
    if (!cards || cards.length === 0) {
      console.log("Unable to load employer cards.");
      return <Typography>No data available</Typography>;
    }
    return cards.map((item) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
        key={item.employerID}
        style={{ padding: "10px", position: "relative" }}
        onMouseEnter={() => setHoveredCard(item.employerID)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <Card
          key={item.employerID}
          onClick={() => {
            console.log("Employee ID:", item.employerID);
            handleCardClick(item.employerID); // Pass item.employerID here
          }}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5">{item.companyName}</Typography>
              <Typography>{item.industry}</Typography>
              <Typography>{item.headquartersAddress}</Typography>
              <Typography>{item.hasEmployed}</Typography>
            </CardContent>
          </CardActionArea>

          {hoveredCard === item.employerID && (
            <div
              style={{
                justifyContent: "flex-start",
                alignContent: "flex-start",
                position: "absolute",
                right: "0",
              }}
            >
              <IconButton
                style={{ justifyContent: "flex-end", color: "#035AA6" }}
                onClick={(e) => handleMenuToggle(e, item.employerID)}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          )}

          {isMenuOpen[item.employerID] && (
            <Card style={{ backgroundColor: "#D3D3D3", margin: "5px" }}>
              <CardActions>
                <IconButton
                  style={{ color: "#035AA6" }}
                  onClick={(e) => handleEdit(item.employerID, e)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  style={{ color: "red" }}
                  onClick={(e) => handleDeleteDialog(item.employerID, e)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          )}
        </Card>
      </Grid>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Employer Data");
        const response = await fetch("http://localhost:4000/home");
        console.log(response);
        const result = await response.json();

        // Filter the companies that don't have a parentCompany
        const parentCompanies = result.filter((item) => !item.parentCompany);

        setCards(parentCompanies); // Set the filtered companies as cards
        console.log(result);
      } catch (error) {
        console.error("Error fetching Employer Data:");
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
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleEditSubmit = async (employerID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/home/edit/${employerID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        setEditDialogOpen(false);
        setEditingEmployerID(null);
        window.location.reload();
      } else {
        console.error("Error updating employer:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating employer:", error);
    }
  };

  const handleAddSubmit = async (addData) => {
    try {
      console.log('Form values submitted:', addData);

      const response = await fetch(
        "http://localhost:4000/modification/addEmployer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addData),
        }
      );
      if (response.ok) {
        console.log('Company Add Successful');
        alert('Company add successful. Database updating.');
      } else {
        console.log('Company already exists');
        alert('Company already exists');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }

  };

  return (
    <Box>
      {showTree ? (
        <TreeDiagram />
      ) : (
        <>

          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Employer</DialogTitle>
            <DialogContent>
              <TextField
                label="Company Name"
                value={editData.companyName}
                onChange={(e) =>
                  setEditData({ ...editData, companyName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Industry"
                value={editData.industry}
                onChange={(e) =>
                  setEditData({ ...editData, industry: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Headquarters Address"
                value={editData.headquartersAddress}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    headquartersAddress: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Has Employed"
                value={editData.hasEmployed}
                onChange={(e) =>
                  setEditData({ ...editData, hasEmployed: e.target.value })
                }
                fullWidth
              />
              <DateField
                label="Incorporation Date:"
                value={editData.incorporationDate}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    incorporationDate: e.target.value,
                  })
                }
                fullWidth
              />
              <DateField
                label="Dissolution Date:"
                value={editData.dissolutionDate}
                onChange={(e) =>
                  setEditData({ ...editData, dissolutionDate: e.target.value })
                }
                fullWidth
              />
              <BooleanField
                label="Has the company merged?"
                value={editData.hasMerged}
                onChange={(e) =>
                  setEditData({ ...editData, hasMerged: e.target.value })
                }
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button onClick={() => handleEditSubmit(editingEmployerID)}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Delete Employer</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this employer?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => handleConfirmDelete(deletingEmployerID)}>
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
            <DialogTitle>Add Employer</DialogTitle>
            <DialogContent>
              <TextField
                label="Company Name"
                value={addData.companyName}
                onChange={(e) =>
                  setAddData({ ...addData, companyName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Industry"
                value={addData.industry}
                onChange={(e) =>
                  setAddData({ ...addData, industry: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Headquarters Address"
                value={addData.headquartersAddress}
                onChange={(e) =>
                  setAddData({
                    ...addData,
                    headquartersAddress: e.target.value,
                  })
                }
                fullWidth
              />
              <DateField
                label="Incorporation Date:"
                value={addData.incorporationDate}
                onChange={(e) =>
                  setAddData({ ...addData, incorporationDate: e.target.value })
                }
                fullWidth
              />
              <DateField
                label="Dissolution Date:"
                value={addData.dissolutionDate}
                onChange={(e) =>
                  setAddData({ ...addData, dissolutionDate: e.target.value })
                }
                fullWidth
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={addData.hasMerged}
                    onChange={(e) =>
                      setAddData({ ...addData, hasMerged: e.target.value })
                    }
                    fullWidth
                  />
                }
                label="Has the company merged?"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddDialogClose}>Cancel</Button>
              <Button onClick={() => handleAddSubmit(addData)}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Grid
            container
            spacing={2}
            backgroundColor="white"
            margin={"auto"}
            padding={"20px"}
            boxShadow={20}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              style={{ marginTop: "0px" }}
            >
              <Grid>
                {/*Search*/}
                <Grid style={{ marginTop: "0px" }}>
                  <Grid container justifyContent="flex-start">
                    <StyledSearch
                      width={"100vw"}
                      border={"10px solid black"}
                      display={"flex"}
                      justifyContent={"flex-end"}
                    >
                      <StyledInputBase
                        width={"100vw"}
                        display={"flex"}
                        border={"10px solid black"}
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </StyledSearch>
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      endIcon={<SearchIcon />}
                    >
                      Search
                    </Button>
                    {/* Admin Button (Conditional) */}
                    {isAdmin && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/admin')}
                      >
                        Admin
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="primary"
              >
                Logout
              </Button>
            </Grid>
            {/* Filters */}
            <Grid
              item
              xs={2}
              justifyContent={"center"}
              alignContent={"center"}
              boxShadow={30}
              style={{ display: "sticky" }}
            >
              <Stack
                spacing={2}
                useFlexGap
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Item>Filter 1</Item>
                <Item>Filter 2</Item>
                <Item>Filter 3</Item>
                <Item>
                  <div>
                    <button onClick={handleAdd}>Add Company</button>
                  </div>
                  {/* {addDialogOpen ? <AddEmployer /> : null} */}
                </Item>
              </Stack>
            </Grid>
            {/* Cards */}
            <Grid item xs={10} style={{ padding: "20px" }}>
              <Grid
                container
                spacing={1}
                style={{
                  backgroundColor: "#D3D3D3",
                  padding: "px",
                  border: "10px solid white",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                {renderCards()}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Home;