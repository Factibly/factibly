import React from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const AnonymousMenu = () => {
  const history = useHistory();
  return (
    <Box display="flex" flexDirection="row">
      <Box mx={1} flex={1}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            history.push("/account/sign-in");
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          <FormattedMessage id="login" />
        </Button>
      </Box>
      {/* <Box mx={1} flex={1}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              history.push("/account/register");
            }}
          >
            <FormattedMessage id="register" />
          </Button>
        </Box> */}
    </Box>
  );
};

export default AnonymousMenu;
