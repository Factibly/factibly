import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Form, Field, FormikErrors } from "formik";
import FormGroupCompact from "../../common/FormGroupCompact";
import FakeCheckInput from "../../common/FakeCheckInput";
import FormButtonBox from "../../common/FormButtonBox";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Popover } from "@material-ui/core";
import { RegistrationFormValues } from "../../utils/forms/registration-form-helper";

interface UserCredentialsFormProps {
  values: RegistrationFormValues;
  errors: FormikErrors<RegistrationFormValues>;
  onNext: (event: any) => void | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const AccountCredentialsForm = ({ values, errors, onNext }: UserCredentialsFormProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Form onSubmit={onNext}>
      <FormGroupCompact>
        <Field
          as={FakeCheckInput}
          name="email"
          autoComplete="email"
          label={intl.formatMessage({ id: "user.registration.form.field.email" })}
          errorMsg={errors.email}
          autoFocus
          aria-required="true"
        />
        <Field
          as={FakeCheckInput}
          name="password"
          type="password"
          label={intl.formatMessage({ id: "user.registration.form.field.password" })}
          errorMsg={errors.password}
          onMouseDown={handlePopoverOpen}
          onBlur={handlePopoverClose}
          aria-required="true"
          aria-owns={openPopover ? "password-strength-popover" : undefined}
          aria-haspopup="true"
        />
        <Popover
          id="password-strength-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          disableAutoFocus
          disableEnforceFocus
        >
          <PasswordStrengthIndicator password={values.password} />
        </Popover>
        <Field
          as={FakeCheckInput}
          name="passwordConfirmation"
          type="password"
          label={intl.formatMessage({ id: "user.registration.form.field.passwordConfirmation" })}
          errorMsg={errors.passwordConfirmation}
        />
      </FormGroupCompact>
      <FormButtonBox primaryText={intl.formatMessage({ id: "general.action.next" })} />
    </Form>
  );
};

export default AccountCredentialsForm;
