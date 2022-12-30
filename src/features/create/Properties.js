import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  DialogContentText,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export const PropertiesPopUp = (props) => {
  const { propertyData, setpropertyData, setIsPropertiesPopUpVisible } = props;

  const handleClose = () => {
    setIsPropertiesPopUpVisible(false);
  };

  const addMoreClick = () => {
    setpropertyData([...propertyData, { name: "", types: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let data = [...propertyData];
    data[index][name] = value;
    setpropertyData(data);
  };

  const removeProp = (i) => {
    let newpropertyData = [...propertyData];
    newpropertyData.splice(i, 1);
    setpropertyData(newpropertyData);
  };

  return (
    <Box className="container-fluid">
      <Box className="mui_outr">
        <Dialog open={true} fullWidth maxWidth="sm" onClose={handleClose}>
          <DialogTitle sx={{ fontSize: { xs: 25, md: 40 } }}>
            <h2 className="mid_hd">Add Properties</h2>
          </DialogTitle>
          <DialogContent>
            <Stack>
              <Box>
                Properties show up underneath your item, are clickable, and can
                be filtered in your collection's sidebar.
              </Box>
            </Stack>
          </DialogContent>

          {propertyData?.map((item, index) => {
            return (
              <Box key={index} className="modal_inputt_outr">
                <TextField
                  className="modl_input"
                  id="outlined-basic"
                  label="Type"
                  variant="outlined"
                  name="types"
                  value={item.types}
                  onChange={(e) => handleChange(e, index)}
                />
                <TextField
                  className="modl_input"
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={item.name}
                  onChange={(e) => handleChange(e, index)}
                />
                <Box className="close">
                  <CloseIcon onClick={() => removeProp(index)} />
                </Box>
              </Box>
            );
          })}
          <Box className="pad10">
            <DialogContentText>
              <Box className="more">
                <Button onClick={addMoreClick}>
                  <AddIcon />{" "}
                </Button>
              </Box>
            </DialogContentText>

            <DialogActions>
              <Box className="sve">
                <Button onClick={handleClose}>Close</Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};
