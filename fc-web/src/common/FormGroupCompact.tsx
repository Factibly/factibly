import { withStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";

const FormGroupCompact = withStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
}))(FormGroup);

export default FormGroupCompact;
