import React, { Component } from "react";
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
  searchInput: string;
}

interface ComponentProps {}

interface ComponentState {
  search: Search;
}

class HomeSearch extends Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleMouseDownClear = this.handleMouseDownClear.bind(this);
    this.state = {
      search: {
        searchInput: ""
      }
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    this.setState({ search: { ...this.state.search, [target.name]: target.value } });
  }

  handleClearSearch() {
    this.setState({ search: { ...this.state.search, searchInput: "" } });
  }

  handleMouseDownClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  render() {
    return (
      <Grid container className="container-grid" justify="center" alignItems="center">
        <Paper component="form" elevation={4} style={{ padding: "2px 4px", display: "flex", width: "50%" }}>
          <InputBase
            fullWidth
            name="searchInput"
            placeholder="Search by keyword or URL"
            value={this.state.search.searchInput}
            onChange={this.handleChange}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            endAdornment={
              this.state.search.searchInput && (
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

export default HomeSearch;
