import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import zxcvbn from "zxcvbn";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const passwordScoreToTextual = (score: number) => (
  <FormattedMessage id={`user.form.msg.passwordStrength.${score}.content`} />
);

export function retrievePasswordRequirements(password: string) {
  return Object.freeze([
    [password.length >= 8, "user.form.msg.passwordTooShort.content"],
    [/.*[A-Z].*/.test(password), "user.form.msg.passwordOneUpper.content"],
    [/.*[1-9].*/.test(password), "user.form.msg.passwordOneNumber.content"],
    // [/^(?:(.)(?!\1{3}))*$/.test(password), "user.form.msg.passwordNoConsecutive.content"],
  ]);
}

class PasswordStrengthIndicator extends PureComponent<PasswordStrengthIndicatorProps> {
  render() {
    const { password } = this.props;
    const score = zxcvbn(password, ["fact", "fake", "fakecheck"])?.score;

    return (
      <div style={{ fontSize: "small", textAlign: "left" }}>
        <meter value={score} min={0} max={4} low={2} high={3} optimum={4} style={{ width: "100%" }}>
          {passwordScoreToTextual(score)}
        </meter>
        <div id="password-strength">
          <strong> {passwordScoreToTextual(score)} </strong>
        </div>
        <br />
        <FormattedMessage id="user.form.msg.passwordHeader.name" /> <br />
        {retrievePasswordRequirements(password).map((req, index) => (
          <React.Fragment key={`pass-req-${index}`}>
            <span className="circle-sm" style={{ backgroundColor: req[0] ? "green" : "red" }} />
            &nbsp;&nbsp;
            <FormattedMessage id={req[1].toString()} />
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default PasswordStrengthIndicator;
