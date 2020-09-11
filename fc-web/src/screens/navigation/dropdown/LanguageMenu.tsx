import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changeWebsiteLocale } from "../../../store/settings/actions";
import { RootState } from "../../../store/rootReducer";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import locales from "../../../static/locales";

interface LanguageMenuProps extends WrappedComponentProps<"intl"> {
  locale: string;
  changeWebsiteLocale: (locale: string) => object;
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
        {Object.values(locales).map(({ display, bcp }) => (
          <DropdownMenuItem
            key={bcp}
            primary={display}
            selected={bcp === this.props.locale}
            onClick={() => {
              this.props.changeWebsiteLocale(bcp);
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
  changeWebsiteLocale: (locale: string) => dispatch(changeWebsiteLocale(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LanguageMenu));
