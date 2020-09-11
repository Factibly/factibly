import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import SearchBar from "../common/SearchBar";
import CenteredDiv from "../common/CenteredDiv";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Paper, Button, Popover, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { GraphQLError } from "graphql";
import { useMutation } from "@apollo/client";
import { SEARCH_CONTENT } from "../gql/mutations";
import { useAlert } from "../hooks/useAlert";
import history from "../hooks/history";
import { FACT_CHECK_BASE_PATH } from "../static/paths";
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
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [searchFactCheck] = useMutation<SearchContent, SearchContentVariables>(SEARCH_CONTENT);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchClear = () => setSearchQuery("");
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);
  const handleSearchSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      const res = await searchFactCheck({ variables: { input: { url: searchQuery } } });
      if (res.data?.searchContent?.errors) throw new GraphQLError(res.data?.searchContent?.errors);
      history.push(`${FACT_CHECK_BASE_PATH}/${res.data!.searchContent!.content!.id}`);
    } catch (err) {
      setAlert({
        severity: "error",
        message: intl.formatMessage({ id: parseGqlErrorMsg(err.toString()) }),
      });
    }
  };

  const [anchorElTutorial, setAnchorElTutorial] = useState<HTMLButtonElement | null>(null);
  const openTutorial = Boolean(anchorElTutorial);
  const tutorialPopoverId = openTutorial ? "home-factibly-tutorial-popover" : undefined;
  const handleOpenTutorial = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElTutorial(event.currentTarget);
  const handleCloseTutorial = () => setAnchorElTutorial(null);

  return (
    <CenteredDiv style={{ height: "70vh" }}>
      <Helmet>
        <title>Factibly</title>
      </Helmet>
      <div className={classes.searchContainer}>
        <Paper component="form" role="search" onSubmit={handleSearchSubmit} elevation={4}>
          <SearchBar
            classes={{ root: classes.inputRoot }}
            autoComplete="url"
            value={searchQuery}
            onChange={handleSearchInput}
            onClear={handleSearchClear}
            apv={4}
            aph={5}
            dynamicSizing
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
          anchorEl={anchorElTutorial}
          onClose={handleCloseTutorial}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Typography variant="h6">{intl.formatMessage({ id: "home.tutorial.action.open" })}</Typography>
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
