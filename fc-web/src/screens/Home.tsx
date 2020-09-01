import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import SearchBar from "../common/SearchBar";
import CenteredDiv from "../common/CenteredDiv";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import { Paper, Button, Popover, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { GraphQLError } from "graphql";
import { useMutation } from "@apollo/client";
import { SEARCH_CONTENT } from "../gql/mutations";
import { useAlert } from "../hooks/useAlert";
import history from "../hooks/history";
import { FACT_CHECK_PATH } from "../static/paths";
import { parseGqlErrorMsg } from "../utils/string-utils";
import { SearchContent, SearchContentVariables } from "../gql/__generated__/SearchContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchContainer: {
      width: "70%",
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.only("sm")]: {
        width: "80%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    tutorialButton: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1),
      textTransform: "none",
    },
    tutorialPopoverPaper: {
      padding: theme.spacing(3),
    },
  })
);

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleClearSearch = () => setSearchQuery("");
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openTutorial = Boolean(anchorEl);
  const tutorialPopoverId = openTutorial ? "home-factibity-tutorial-popover" : undefined;
  const handleOpenTutorial = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleCloseTutorial = () => setAnchorEl(null);

  const [searchMutation] = useMutation<SearchContent, SearchContentVariables>(SEARCH_CONTENT);
  const handleSubmitSearch = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    try {
      const res = await searchMutation({ variables: { input: { url: searchQuery } } });

      if (res.data?.searchContent?.errors) throw new GraphQLError(res.data?.searchContent?.errors);

      history.push(FACT_CHECK_PATH.replace(":contentId", res.data!.searchContent!.content!.id));
    } catch (err) {
      setAlert({
        severity: "error",
        message: intl.formatMessage({ id: parseGqlErrorMsg(err.toString()) }),
      });
    }
  };

  return (
    <CenteredDiv style={{ height: "70vh" }}>
      <Helmet>
        <title>Factibly</title>
      </Helmet>
      <div className={classes.searchContainer}>
        <Paper component="form" role="search" onSubmit={handleSubmitSearch} elevation={4}>
          <SearchBar
            classes={{ root: classes.inputRoot }}
            autoComplete="url"
            value={searchQuery}
            onChange={handleSearchInput}
            onSubmit={handleSubmitSearch}
            onClear={handleClearSearch}
            adornmentPaddingTopBottom={theme.spacing(4)}
          />
        </Paper>
        <Button
          className={classes.tutorialButton}
          size="small"
          startIcon={<InfoIcon />}
          onClick={handleOpenTutorial}
          aria-describedby={tutorialPopoverId}
        >
          {intl.formatMessage({ id: "home.tutorial.action.open" })}
        </Button>
        <Popover
          id={tutorialPopoverId}
          classes={{ paper: classes.tutorialPopoverPaper }}
          open={openTutorial}
          anchorEl={anchorEl}
          onClose={handleCloseTutorial}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography variant="h6"> {intl.formatMessage({ id: "home.tutorial.action.open" })}</Typography>
          <Typography variant="subtitle2" paragraph>
            1. Copy the URL of an article for which you want to explore its fact check <br />
            2. Paste it in the search bar
          </Typography>
          That's it! It's really easy.
          <br />
          &mdash; The Factibly Team
        </Popover>
      </div>
    </CenteredDiv>
  );
};

export default Home;
