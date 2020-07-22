import React, { useState } from "react";
import { useIntl } from "react-intl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BootstrapInput from "../../common/BootstrapInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  })
);

const sortingTypes = Object.freeze(["factCheck.userRatings.action.sort.mostRecent.name"]);

const UserRatings = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [sortingTypeIndex, setSortingTypeIndex] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortingTypeIndex(event.target.value as number);
  };

  return (
    <>
      <FormControl variant="filled" className={classes.formControl}>
        <Select input={<BootstrapInput />} value={sortingTypeIndex} onChange={handleChange}>
          {sortingTypes.map((id, index) => (
            <MenuItem key={`sort-justification-${id}`} value={index}>
              {intl.formatMessage({ id })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default UserRatings;
