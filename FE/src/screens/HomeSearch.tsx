import React, { Component } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { isMobile } from "react-device-detect";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import "../styles/desktop.css";
import "../styles/universal.css";

interface Search {
  query: string;
}

interface HomeSearchProps extends WrappedComponentProps<"intl"> {}

interface HomeSearchState {
  search: Search;
}

const homeSearchBarStyle = { padding: "4px 4px", display: "flex", width: isMobile ? "80%" : "70%" };

class HomeSearch extends Component<HomeSearchProps, HomeSearchState> {
  constructor(props: HomeSearchProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleMouseDownClear = this.handleMouseDownClear.bind(this);
    this.state = {
      search: {
        query: ""
      }
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    this.setState({ search: { ...this.state.search, [target.name]: target.value } });
  }

  handleClearSearch() {
    this.setState({ search: { ...this.state.search, query: "" } });
  }

  handleMouseDownClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" style={{ margin: "32px 0" }}>
        <Paper component="form" role="search" elevation={4} style={homeSearchBarStyle}>
          <InputBase
            fullWidth
            name="query"
            role="searchbox"
            placeholder={this.props.intl.formatMessage({ id: "homeSearchPrompt" })}
            value={this.state.search.query}
            onChange={this.handleChange}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            endAdornment={
              this.state.search.query && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClearSearch}
                    onMouseDown={this.handleMouseDownClear}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
            inputProps={{ disableUnderline: true, variant: "outlined" }}
            style={{ flex: 1, padding: 10, borderRadius: 5 }}
          />
        </Paper>
      </Grid>
    );
  }
}

export default injectIntl(HomeSearch);
