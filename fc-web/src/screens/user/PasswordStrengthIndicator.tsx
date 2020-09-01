import React, { PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import zxcvbn from "zxcvbn";
import { retrievePasswordRequirements } from "../../utils/forms/registration-form-helper";

interface PasswordStrengthIndicatorProps extends WrappedComponentProps<"intl"> {
  password: string;
}

class PasswordStrengthIndicator extends PureComponent<PasswordStrengthIndicatorProps> {
  passwordScoreToTextual(score: number) {
    return this.props.intl.formatMessage({ id: `user.registration.form.msg.password.strength.${score}` });
  }

  render() {
    const score = zxcvbn(this.props.password, ["fact", "fake", "factibly"])?.score;
    return (
      <div style={{ fontSize: "small", textAlign: "left" }}>
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
          <strong> {this.passwordScoreToTextual(score)} </strong>
        </div>
        <br />
        {this.props.intl.formatMessage({ id: "user.registration.form.msg.password.header" })} <br />
        {retrievePasswordRequirements(this.props.password).map((req, index) => (
          <React.Fragment key={`password-requirement-${index}`}>
            <span className="circle-sm" style={{ backgroundColor: req.validator ? "green" : "red" }} />
            &nbsp;&nbsp;
            {this.props.intl.formatMessage({ id: req.failTextId })}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default injectIntl(PasswordStrengthIndicator);
