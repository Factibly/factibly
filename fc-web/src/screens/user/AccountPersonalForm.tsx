import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Form, Field, FormikErrors, useFormikContext, useField } from "formik";
import FormGroupCompact from "../../common/FormGroupCompact";
import FcInput from "../../common/FcInput";
import FcCalendarPicker from "../../common/FcCalendarPicker";
import FcErrorMessage from "../../common/FcErrorMessage";
import FormButtons from "../../common/FormButtons";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { RegistrationFormValues, retrieveMinimumRequiredAge } from "../../utils/forms/registration-form-helper";
import { getSortedCountries } from "../../utils/string-utils";

interface UserPersonalFormProps {
  errors: FormikErrors<RegistrationFormValues>;
  onBack: () => void;
  onNext: (event: any) => void | undefined;
}

export var countryNameCodeMap = {};

const AccountPersonalForm = ({ errors, onBack, onNext }: UserPersonalFormProps) => {
  const intl = useIntl();

  const { setFieldValue } = useFormikContext();
  const [dateOfBirthField] = useField({ name: "dateOfBirth" });

  const [sortedCountryNames, setSortedCountryNames] = useState<string[]>([]);
  useEffect(() => {
    const sortedCountries = getSortedCountries(code => intl.formatDisplayName(code, { type: "region" }) ?? "");
    countryNameCodeMap = { ...sortedCountries.codeMap };
    setSortedCountryNames(sortedCountries.names);
  }, [intl]);

  return (
    <Form onSubmit={onNext}>
      <FormGroupCompact>
        <Field
          as={FcInput}
          name="firstName"
          label={intl.formatMessage({ id: "user.registration.form.field.firstName" })}
          errorMsg={errors.firstName}
          autoFocus
          aria-required="true"
        />
        <Field
          as={FcInput}
          name="lastName"
          label={intl.formatMessage({ id: "user.registration.form.field.lastName" })}
          errorMsg={errors.lastName}
          aria-required="true"
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="country">
            {intl.formatMessage({ id: "user.registration.form.field.countryRegion" })}
          </InputLabel>
          <Field
            as={Select}
            id="country"
            variant="outlined"
            name="country"
            autoComplete="country-name"
            label={intl.formatMessage({ id: "user.registration.form.field.countryRegion" })}
            native
            aria-required="true"
            aria-describedby="user-registration-country"
          >
            <option value="" disabled />
            {sortedCountryNames.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Field>
          {errors.country && <FcErrorMessage id="country-error-message" msg={errors.country} />}
        </FormControl>
        <FcCalendarPicker
          {...dateOfBirthField}
          Picker={DatePicker}
          autoOk
          autoComplete="bday"
          openTo="year"
          format="dd/MM/yyyy"
          maxDate={retrieveMinimumRequiredAge()}
          maxDateMessage={
            <FcErrorMessage
              id={intl.formatMessage({ id: "user.registration.form.field.dateOfBirth" })}
              msg={intl.formatMessage({ id: "user.registration.form.msg.age.minimum" })}
            />
          }
          label={intl.formatMessage({ id: "user.registration.form.field.dateOfBirth" })}
          helperText={intl.formatMessage({ id: "user.registration.form.msg.age.minimum" })}
          selectedDate={dateOfBirthField.value}
          onChange={(date: MaterialUiPickersDate) => setFieldValue(dateOfBirthField.name, date || new Date(), true)}
          aria-required="true"
        />
      </FormGroupCompact>
      <FormButtons
        primaryText={intl.formatMessage({ id: "general.action.next" })}
        secondaryText={intl.formatMessage({ id: "general.action.back" })}
        onSecondaryClick={onBack}
      />
    </Form>
  );
};

export default AccountPersonalForm;
