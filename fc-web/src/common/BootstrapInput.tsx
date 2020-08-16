import { createStyles, withStyles, Theme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        // marginTop: theme.spacing(3)
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #CED4DA",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80BDFF",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

export default BootstrapInput;
