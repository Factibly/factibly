import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changeWebsiteLanguage } from "../../../store/settings/actions";
import { RootState } from "../../../store/rootReducer";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import locales from "../../../static/locales";

interface LanguageMenuProps extends WrappedComponentProps<"intl"> {
  locale: string;
  changeWebsiteLanguage: (locale: string) => object;
  onMenuBack: () => void;
  onMenuDone: () => void;
}

class LanguageMenu extends PureComponent<LanguageMenuProps> {
  render() {
    return (
      <>
        <DropdownMenuItem
          primary={this.props.intl.formatMessage({ id: "nav.dropdown.item.language" })}
          icon={<ChevronLeftIcon />}
          onClick={this.props.onMenuBack}
        />
        {Object.values(locales).map(({ bcp }) => (
          <DropdownMenuItem
            key={bcp}
            primary={this.props.intl.formatMessage({ id: `app.locale.${bcp}` })}
            selected={bcp === this.props.locale}
            onClick={() => {
              this.props.changeWebsiteLanguage(bcp);
              this.props.onMenuDone();
            }}
          />
        ))}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ locale: state.settingsReducer.locale });
const mapDispatchToProps = (dispatch: any) => ({
  changeWebsiteLanguage: (locale: string) => dispatch(changeWebsiteLanguage(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LanguageMenu));
