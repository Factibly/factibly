import { withStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const FormPaper = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      minWidth: "600px !important",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },
}))(Paper);

export default FormPaper;
