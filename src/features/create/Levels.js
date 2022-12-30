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

export const LevelsPopUp = (props) => {
  const { levels, setlevels, setisLevelPopUpVisible } = props;

  const handleClose = () => {
    setisLevelPopUpVisible(false);
  };

  const addMoreClick = () => {
    setlevels([...levels, { name: "", valueOf: "", valueFrom: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let data = [...levels];
    data[index][name] = value;
    setlevels(data);
  };

  const removeProp = (i) => {
    let newlevels = [...levels];
    newlevels.splice(i, 1);
    setlevels(newlevels);
  };

  return (
    <Box className="mui_outr ">
      <Dialog open={true} fullWidth maxWidth="sm" onClose={handleClose}>
        <DialogTitle sx={{ fontSize: { xs: 25, md: 40 } }}>
          <h2 className="mid_hd">Add Levels</h2>
        </DialogTitle>
        <DialogContent>
          <Stack>
            <Box>
              Levels show up underneath your item, are clickable, and can be
              filtered in your collection's sidebar.
            </Box>
          </Stack>
        </DialogContent>

        {levels?.map((item, index) => {
          return (
            <Box key={index} className="modal_inputt_outr lvl_mdl">
              <TextField
                className="modl_input"
                id="outlined-basic"
                label="Name"
                name="name"
                variant="outlined"
                value={item.name}
                onChange={(e) => handleChange(e, index)}
              />
              <TextField
                className="modl_input"
                id="outlined-basic"
                label="Value"
                name="valueOf"
                variant="outlined"
                value={item.valueOf}
                type="number"
                onChange={(e) => handleChange(e, index)}
              />
              <span className="dblk">OF</span>
              <TextField
                className="modl_input"
                id="outlined-basic"
                label="Value"
                name="valueFrom"
                variant="outlined"
                type="number"
                value={item.valueFrom}
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
              <Button onClick={addMoreClick}>Add </Button>
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
  );
};
