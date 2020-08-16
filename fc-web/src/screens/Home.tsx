import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import SearchBar from "../common/SearchBar";
import CenteredDiv from "../common/CenteredDiv";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
    search: {
      display: "flex",
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
  })
);

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchMutation] = useMutation<SearchContent, SearchContentVariables>(SEARCH_CONTENT);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const submitSearch = async (event: React.FormEvent<HTMLDivElement>) => {
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
        <title> FakeCheck </title>
      </Helmet>
      <Paper className={classes.search} component="form" role="search" onSubmit={submitSearch} elevation={4}>
        <SearchBar
          classes={{ root: classes.inputRoot }}
          value={searchQuery}
          onChange={handleSearchInput}
          onSubmit={submitSearch}
          onClear={handleClearSearch}
          adornmentPaddingTopBottom={theme.spacing(4)}
        />
      </Paper>
    </CenteredDiv>
  );
};

export default Home;
