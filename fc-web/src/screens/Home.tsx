import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { isMobile } from "react-device-detect";
import SearchBar from "../common/SearchBar";
import CenteredDiv from "../common/CenteredDiv";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useMutation } from "@apollo/client";
import { SEARCH } from "../gql/mutations";
import history from "../hooks/history";

export const retrieveSearchMutationOptions = (searchQuery: string) => {
  return {
    variables: { url: searchQuery },
    onCompleted: (data: any) => {
      history.push(`/content/${data.createContent.content.id}`);
    },
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      display: "flex",
      width: isMobile ? "80%" : "70%",
      borderRadius: theme.shape.borderRadius,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(2.5, 0),
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchMutation] = useMutation(SEARCH, retrieveSearchMutationOptions(searchQuery));

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const submitSearch = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    searchMutation();
  };

  return (
    <CenteredDiv style={{ height: "70vh" }}>
      <Paper className={classes.search} component="form" role="search" onSubmit={submitSearch} elevation={4}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchInput}
          onSubmit={submitSearch}
          onClear={handleClearSearch}
          adornmentPaddingTopBottom={theme.spacing(4)}
          extensionClasses={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </Paper>
    </CenteredDiv>
  );
};

export default injectIntl(Home);
