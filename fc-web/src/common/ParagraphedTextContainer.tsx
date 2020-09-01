import { withStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const ParagraphedTextContainer = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 8),
    "& > section:not(:last-child), & > div:not(:last-child)": {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      wordWrap: "break-word",
    },
    "& p:not(.primary-text), & ul:not(.primary-text)": {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.only("sm")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}))(Container);

export default ParagraphedTextContainer;
