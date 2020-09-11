import React, { PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import zxcvbn from "zxcvbn";
import IconicText from "../../common/IconicText";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { retrievePasswordRequirements } from "../../utils/forms/registration-form-helper";

interface PasswordStrengthIndicatorProps extends WrappedComponentProps<"intl">, WithThemeProps {
  password: string;
}

class PasswordStrengthIndicator extends PureComponent<PasswordStrengthIndicatorProps> {
  passwordScoreToTextual(score: number) {
    return this.props.intl.formatMessage({ id: `user.registration.form.msg.password.strength.${score}` });
  }

  render() {
    const score = zxcvbn(this.props.password, ["fact", "fake", "factibly"])?.score;
    return (
      <Typography component="div" variant="body2" align="left">
        <meter
          value={score}
          min={0}
          max={4}
          low={2}
          high={3}
          optimum={4}
          style={{ width: "100%" }}
          aria-label={this.props.intl.formatMessage({ id: "user.registration.form.msg.password.strength.aria" })}
          aria-valuetext={this.passwordScoreToTextual(score)}
        />
        <div id="password-strength">
          <strong>{this.passwordScoreToTextual(score)}</strong>
        </div>
        <br />
        {this.props.intl.formatMessage({ id: "user.registration.form.msg.password.header" })}
        <br />
        {retrievePasswordRequirements(this.props.password).map((requirement, index) => (
          <React.Fragment key={`password-requirement-${index}`}>
            <IconicText
              text={this.props.intl.formatMessage({ id: requirement.failTextId })}
              icon={
                <span
                  className="circle-sm"
                  style={{
                    backgroundColor: this.props.theme.palette[requirement.passed ? "success" : "error"].main,
                  }}
                />
              }
            />
          </React.Fragment>
        ))}
      </Typography>
    );
  }
}

export default injectIntl(withTheme(PasswordStrengthIndicator));
