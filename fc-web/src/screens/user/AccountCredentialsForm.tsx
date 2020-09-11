import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Form, Field, FormikErrors } from "formik";
import FormGroupCompact from "../../common/FormGroupCompact";
import FcInput from "../../common/FcInput";
import FormButtons from "../../common/FormButtons";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Popover } from "@material-ui/core";
import { RegistrationFormValues } from "../../utils/forms/registration-form-helper";

interface AccountCredentialsFormProps {
  values: RegistrationFormValues;
  errors: FormikErrors<RegistrationFormValues>;
  onNext: (event: any) => void;
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

const AccountCredentialsForm = ({ values, errors, onNext }: AccountCredentialsFormProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [anchorElPsi, setAnchorElPsi] = useState<HTMLElement | null>(null);
  const openPsi = Boolean(anchorElPsi);
  const psiPopoverId = openPsi ? "password-strength-popover" : undefined;
  const handlePsiOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorElPsi(event.currentTarget);
    }
  };
  const handlePsiClose = () => setAnchorElPsi(null);

  return (
    <Form onSubmit={onNext}>
      <FormGroupCompact>
        <Field
          as={FcInput}
          name="email"
          autoComplete="email"
          label={intl.formatMessage({ id: "user.registration.form.field.email" })}
          errorMsg={errors.email}
          autoFocus
          aria-required="true"
        />
        <Field
          as={FcInput}
          name="password"
          type="password"
          label={intl.formatMessage({ id: "user.registration.form.field.password" })}
          errorMsg={errors.password}
          onMouseDown={handlePsiOpen}
          onBlur={handlePsiClose}
          aria-required="true"
          aria-owns={psiPopoverId}
          aria-haspopup="true"
        />
        <Popover
          id={psiPopoverId}
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={openPsi}
          anchorEl={anchorElPsi}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          disableAutoFocus
          disableEnforceFocus
        >
          <PasswordStrengthIndicator password={values.password} />
        </Popover>
        <Field
          as={FcInput}
          name="passwordConfirmation"
          type="password"
          label={intl.formatMessage({ id: "user.registration.form.field.passwordConfirmation" })}
          errorMsg={errors.passwordConfirmation}
        />
      </FormGroupCompact>
      <FormButtons primaryText={intl.formatMessage({ id: "general.action.next" })} />
    </Form>
  );
};

export default AccountCredentialsForm;
