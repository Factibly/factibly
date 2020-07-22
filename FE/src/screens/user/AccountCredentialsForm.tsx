import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Form, Field, FormikErrors } from "formik";
import { RegistrationFormValues } from "./Registration";
import TextInput from "../../common/TextInput";
import FormButtonBox from "../../common/FormButtonBox";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormGroup, Popover } from "@material-ui/core";

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
      <FormGroup className="account-form">
        <Field
          as={TextInput}
          name="email"
          autoComplete="email"
          label={intl.formatMessage({ id: "user.form.field.emailAddress.name" })}
          errors={errors.email}
          autoFocus
        />
        <Field
          as={TextInput}
          name="password"
          type="password"
          label={intl.formatMessage({ id: "user.form.field.password.name" })}
          errors={errors.password}
          onMouseDown={handlePopoverOpen}
          onBlur={handlePopoverClose}
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
          as={TextInput}
          name="passwordConfirmation"
          type="password"
          label={intl.formatMessage({ id: "user.form.field.passwordConfirmation.name" })}
          errors={errors.passwordConfirmation}
        />
      </FormGroup>
      <FormButtonBox primaryText={intl.formatMessage({ id: "general.action.next.name" })} />
    </Form>
  );
};

export default AccountCredentialsForm;
