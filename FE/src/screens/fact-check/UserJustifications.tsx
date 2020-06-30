import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BootstrapInput from "../../common/BootstrapInput";
import UserJustification from "./UserJustification";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250
    }
  })
);

const sortingTypes = Object.freeze(["Most Recent"]);

const UserJustifications = () => {
  const classes = useStyles();
  const [sortingTypeIndex, setSortingTypeIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortingTypeIndex(event.target.value as number);
  };

  return (
    <>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="justification-sort-label"> Sort By: </InputLabel>
        <Select
          labelId="justification-sort-label"
          value={sortingTypeIndex}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {sortingTypes.map((element, index) => (
            <MenuItem key={`sort-justification-${index}`} value={index}>
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <UserJustification />
    </>
  );
};

export default UserJustifications;
