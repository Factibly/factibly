import { withStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const PageContainer = withStyles((theme: Theme) => ({
  root: {
    flexDirection: "column",
    margin: "auto",
    padding: theme.spacing(2, 15),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.only("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.only("md")]: {
      paddingLeft: theme.spacing(9),
      paddingRight: theme.spacing(9),
    },
    [theme.breakpoints.only("lg")]: {
      paddingLeft: theme.spacing(12),
      paddingRight: theme.spacing(12),
    },
  },
}))(Container);

export default PageContainer;
