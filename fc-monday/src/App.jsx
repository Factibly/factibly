import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import monday from "./libs/monday";
import FactChecks from "./components/FactChecks";
import { ThemeProvider, CssBaseline, responsiveFontSizes } from "@material-ui/core";
import { BOARDS } from "./gql/monday";
import messages from "./static/messages/messages";
import generateTheme from "./styles/theme";
import arrayMove from "array-move";
import { getUrlRegex } from "./utils/validators";

class App extends Component {
  static theme;
  static urlRegex = getUrlRegex("gi");

  constructor(props) {
    super(props);
    this.state = {
      settings: {},
      name: "",
      context: {},
      boardData: [
        {
          boardId: 1,
          boardItemId: 1,
          url:
            "https://www.nytimes.com/2020/08/05/world/coronavirus-covid-19.html?action=click&module=Top%20Stories&pgtype=Homepage",
        },
        {
          boardId: 1,
          boardItemId: 2,
          url: "https://www.cnn.com/2020/08/02/politics/anthony-tata-nominee-pentagon/index.html",
        },
        {
          boardId: 1,
          boardItemId: 3,
          url: "https://vator.tv/news/2015-08-14-how-does-github-make-money",
        },
        {
          boardId: 1,
          boardItemId: 4,
          url:
            "https://www.theguardian.com/politics/2020/jul/21/boris-johnson-was-asleep-on-the-job-and-since-when-was-idleness-a-crime-",
        },
        {
          boardId: 1,
          boardItemId: 5,
          url: "www.chandlerlei.dev",
        },
        {
          boardId: 1,
          boardItemId: 6,
          url: "www.jadonfan.com",
        },
      ],
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
    monday.listen("settings", res => {
      this.setState({ settings: res.data });
      this.setTheme();
    });

    monday.listen("context", res => {
      this.setState({ context: res.data });
      monday.api(BOARDS, { variables: { boardIds: this.state.context.boardIds } }).then(res => {
        this.setState({ boardData: this.extractBoardData(res.data) });
      });
    });

    // monday.storage.instance.getItem("fact_check_board_data").then(res => {
    //   if (res.data?.value) {
    //     this.setState({ dataBoard: res.data.value.split(",") });
    //   }
    // });
  }

  setTheme() {
    App.theme = generateTheme(this.state?.settings?.primaryColor);
    App.theme = responsiveFontSizes(App.theme);
    return App.theme;
  }

  pushBoardData(boardData, str, boardId, boardItemId) {
    const matches = str?.match(App.urlRegex);
    if (!matches) {
      return boardData;
    }
    return boardData.concat(matches.map(url => ({ boardId, boardItemId, url })));
  }

  extractBoardData = data => {
    let boardData = [...this.state.boardData];
    data.boards.forEach(({ id: boardId, items }) => {
      items.forEach(({ id: itemId, name: itemName, column_values }) => {
        boardData = this.pushBoardData(boardData, itemName, boardId, itemId);
        column_values.forEach(({ title, text }) => {
          boardData = this.pushBoardData(boardData, title, boardId, itemId);
          boardData = this.pushBoardData(boardData, text, boardId, itemId);
        });
      });
    });
    monday.storage.instance.setItem("fact_check_board_data", boardData);
    return boardData;
  };

  onSortStart = () => {
    document.body.style.cursor = "grabbing";
    Array.prototype.forEach.call(document.getElementsByClassName("factCheckCardCard"), v => {
      v.style.cursor = "grabbing";
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const boardData = arrayMove(this.state.boardData, oldIndex, newIndex);

    document.body.style.cursor = "default";
    Array.prototype.forEach.call(document.getElementsByClassName("factCheckCardCard"), v => {
      v.style.cursor = "pointer";
    });

    monday.storage.instance.setItem("fact_check_urls", boardData);
    this.setState({ boardData });
  };

  render() {
    return (
      <IntlProvider locale="en-US" defaultLocale="en-US" messages={messages["en-US"]}>
        <ThemeProvider theme={App.theme || this.setTheme()}>
          <CssBaseline />
          <main className="App">
            <FactChecks
              axis="xy"
              boardData={this.state.boardData}
              showImage={this.state.settings.showImage}
              distance={3}
              onSortStart={this.onSortStart}
              onSortEnd={this.onSortEnd}
            />
          </main>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
