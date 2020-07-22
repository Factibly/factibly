import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changeWebsiteLanguage } from "../../../store/app/screen-actions";
import { FormattedMessage } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

interface LanguageMenuProps {
  locale: string;
  changeWebsiteLanguage: (locale: string) => object;
  onMenuBack: () => void;
  onMenuDone: () => void;
}

class LanguageMenu extends PureComponent<LanguageMenuProps> {
  render() {
    const { onMenuBack, onMenuDone } = this.props;
    return (
      <>
        <DropdownMenuItem
          primary={<FormattedMessage id="nav.dropdown.language.name" />}
          primaryTypographyProps={{ variant: "h6" }}
          icon={<ChevronLeftIcon />}
          onClick={() => onMenuBack()}
        />
        {["en", "fr", "zh-CN", "zh-TW", "ja"].map(locale => (
          <DropdownMenuItem
            key={locale}
            primary={<FormattedMessage id={`app.locale.${locale}.name`} />}
            selected={locale === this.props.locale}
            onClick={() => {
              this.props.changeWebsiteLanguage(locale);
              onMenuDone();
            }}
          />
        ))}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({ locale: state.screenReducers.locale });
const mapDispatchToProps = (dispatch: any) => ({
  changeWebsiteLanguage: (locale: string) => dispatch(changeWebsiteLanguage(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageMenu);
