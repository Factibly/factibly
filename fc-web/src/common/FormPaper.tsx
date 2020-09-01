import { withStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const FormPaper = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
}))(Paper);

export default FormPaper;
