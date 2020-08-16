import React from "react";
import { useIntl, IntlShape } from "react-intl";
import * as countryList from "country-list";
import { Form, Field, FormikErrors, useFormikContext, useField } from "formik";
import { RegistrationFormValues } from "./Registration";
import TextInput from "../../common/TextInput";
import FormButtonBox from "../../common/FormButtonBox";
import FakeCheckCalendarPicker from "../../common/FakeCheckCalendarPicker";
import FakeCheckErrorMessage from "../../common/FakeCheckErrorMessage";
import { FormGroup, FormControl, InputLabel, Select } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface UserPersonalFormProps {
  errors: FormikErrors<RegistrationFormValues>;
  onBack: () => void;
  onNext: (event: any) => void | undefined;
}

if (!(Intl as any).DisplayNames) {
  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/fr");
  require("@formatjs/intl-displaynames/locale-data/zh-Hans");
  require("@formatjs/intl-displaynames/locale-data/zh-Hant");
  require("@formatjs/intl-displaynames/locale-data/ja");
}

export const countryLocalNameCodeMap = {};

function retrieveCountryOptions(intl: IntlShape) {
  return countryList
    .getCodes()
    .map(code => {
      const displayName = intl.formatDisplayName(code, { type: "region" }) ?? "";
      countryLocalNameCodeMap[displayName] = code;
      return displayName;
    })
    ?.sort()
    ?.map(name => (
      <option key={name} value={name}>
        {name}
      </option>
    ));
}

export const retrieveMinimumRequiredAge = function retrieveMinimumRequiredAge() {
  const minAge = 16;
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minAge);
  return maxDate;
};

const AccountPersonalForm = ({ errors, onBack, onNext }: UserPersonalFormProps) => {
  const intl = useIntl();

  const { setFieldValue } = useFormikContext();
  const [dateOfBirthField] = useField({ name: "dateOfBirth" });

  return (
    <Form onSubmit={onNext}>
      <FormGroup className="account-form">
        <Field
          as={TextInput}
          name="firstName"
          label={intl.formatMessage({ id: "user.form.field.firstName.name" })}
          errors={errors.firstName}
          autoFocus
        />
        <Field
          as={TextInput}
          name="lastName"
          label={intl.formatMessage({ id: "user.form.field.lastName.name" })}
          errors={errors.lastName}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="country">{intl.formatMessage({ id: "user.form.field.countryRegion.name" })}</InputLabel>
          <Field
            as={Select}
            variant="outlined"
            name="country"
            autoComplete="country-name"
            label={intl.formatMessage({ id: "user.form.field.countryRegion.name" })}
            errors={errors.country}
            native
          >
            <option value="" disabled />
            {retrieveCountryOptions(intl)}
          </Field>
        </FormControl>
        <FakeCheckCalendarPicker
          {...dateOfBirthField}
          Picker={DatePicker}
          autoOk
          openTo="year"
          format="dd/MM/yyyy"
          maxDate={retrieveMinimumRequiredAge()}
          maxDateMessage={<FakeCheckErrorMessage msg={intl.formatMessage({ id: "user.form.msg.minAge.content" })} />}
          label={intl.formatMessage({ id: "user.form.field.dateOfBirth.name" })}
          helperText={intl.formatMessage({ id: "user.form.msg.minAge.content" })}
          errors={errors.dateOfBirth}
          selectedDate={dateOfBirthField.value}
          onChange={(date: MaterialUiPickersDate) => setFieldValue(dateOfBirthField.name, date || new Date())}
        />
      </FormGroup>
      <FormButtonBox
        primaryText={intl.formatMessage({ id: "general.action.next.name" })}
        secondaryText={intl.formatMessage({ id: "general.action.back.name" })}
        onSecondaryClick={onBack}
      />
    </Form>
  );
};

export default AccountPersonalForm;
