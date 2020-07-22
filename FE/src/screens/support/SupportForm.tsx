import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showTicketSubmissionSuccess, showTicketSubmissionFail } from "../../store/support/support-actions";
import { useIntl } from "react-intl";
import { Formik, Form, Field, FormikErrors } from "formik";
import emailjs from "emailjs-com";
import TextInput from "../../common/TextInput";
import FormButtonBox from "../../common/FormButtonBox";
import FakeCheckCalendarPicker from "../../common/FakeCheckCalendarPicker";
import FakeCheckErrorMessage from "../../common/FakeCheckErrorMessage";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import Banner from "../../common/Banner";
import { FormGroup, TextField } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DateTimePicker } from "@material-ui/pickers";
import supportPrompts, { SupportText } from "../../text/support-prompts";
import { isValidEmailAddress } from "../../utils/user-utils";

interface SupportFormProps {
  supportText: SupportText;
}

interface SupportFormValues {
  email: string;
  title: string;
  description: string;
  occurrenceDate: Date;
}

var topic = "";

const SupportForm = ({ supportText }: SupportFormProps) => {
  const dispatch = useDispatch();
  const ticketSubmitStatus = useSelector((state: any) => state.supportReducers.ticketSubmitStatus);

  const intl = useIntl();

  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const translatedTopics = [...supportText.topics, "general.form.field.other.name"]
    .map(id => intl.formatMessage({ id }))
    ?.sort();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (alsoSendTicket: boolean = false, values?: SupportFormValues) => {
    if (alsoSendTicket) {
      const template_params = {
        reply_to: values?.email,
        category: supportText.nameDefault?.toUpperCase(),
        topic,
        title: values?.title,
        date: values?.occurrenceDate.toString(),
        description: values?.description,
      };

      // emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID ?? "");
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID ?? "",
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? "",
          template_params
        )
        .then(
          () => {
            showTicketSubmissionSuccess()(dispatch);
          },
          () => {
            showTicketSubmissionFail()(dispatch);
          }
        );
    }
    setOpenDialog(false);
  };

  const validate = (values: SupportFormValues) => {
    let errors: FormikErrors<SupportFormValues> = {};
    const requiredFieldMsg = intl.formatMessage({ id: "general.form.msg.requiredField.content" });

    if (!values.title) errors.title = requiredFieldMsg;

    if (!values.email) {
      errors.email = requiredFieldMsg;
    } else if (!isValidEmailAddress(values.email)) {
      errors.email = intl.formatMessage({ id: "support.form.msg.invalidEmailAddress.content" });
    }

    return errors;
  };

  return (
    <>
      {ticketSubmitStatus?.msg && (
        <Banner msg={ticketSubmitStatus.msg} backgroundColor={ticketSubmitStatus.backgroundColor} />
      )}
      <Formik
        initialValues={{
          email: "",
          title: "",
          description: "",
          occurrenceDate: new Date(),
        }}
        onSubmit={handleClickOpenDialog}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, values, setFieldValue, validateForm, submitForm }) => {
          const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFormSubmit(true);
            if (translatedTopics?.includes(topic)) {
              submitForm();
            } else {
              validateForm();
            }
          };
          return (
            <>
              <ConfirmationDialog
                openDialog={openDialog}
                onCancel={() => handleCloseDialog()}
                onReject={() => handleCloseDialog(false)}
                onApprove={() => handleCloseDialog(true, values)}
              />
              <Form onSubmit={onSubmit}>
                <FormGroup className="support-form">
                  <Autocomplete
                    disableClearable
                    openOnFocus
                    autoComplete
                    options={translatedTopics}
                    groupBy={option => {
                      const firstLetter = option.charAt(0)?.toUpperCase();
                      return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
                    }}
                    onInputChange={(_, value) => {
                      topic = value;
                    }}
                    renderInput={(params: any) => (
                      <Field
                        as={TextField}
                        {...params}
                        fullWidth
                        label={intl.formatMessage({ id: "support.form.field.topic.name" })}
                        variant="outlined"
                        error={formSubmit && !topic}
                        helperText={
                          formSubmit && !topic ? (
                            <FakeCheckErrorMessage
                              msg={intl.formatMessage({ id: "general.form.msg.requiredField.content" })}
                            />
                          ) : (
                            supportText.helperTexts?.topic && intl.formatMessage({ id: supportText.helperTexts?.topic })
                          )
                        }
                      />
                    )}
                  />
                  <Field
                    as={TextInput}
                    name="email"
                    label={intl.formatMessage({ id: "support.form.field.emailAddress.name" })}
                    errors={errors.email}
                  />
                  <Field
                    as={TextInput}
                    name="title"
                    label={intl.formatMessage({ id: "support.form.field.title.name" })}
                    errors={errors.title}
                  />
                  <Field
                    as={TextInput}
                    name="description"
                    label={intl.formatMessage({ id: "support.form.field.description.name" })}
                    multiline
                    rows={10}
                    errors={errors.description}
                    helperText={
                      supportText.helperTexts?.description &&
                      intl.formatMessage({ id: supportText.helperTexts?.description })
                    }
                  />
                  {supportPrompts.bug.id === supportText.id && (
                    <FakeCheckCalendarPicker
                      Picker={DateTimePicker}
                      label={intl.formatMessage({ id: "support.form.field.occurrenceTime.name" })}
                      selectedDate={values?.occurrenceDate}
                      onChange={(date: MaterialUiPickersDate) => setFieldValue("occurrenceDate", date ?? new Date())}
                      helperText={intl.formatMessage({ id: supportText.helperTexts?.bugTime })}
                    />
                  )}
                </FormGroup>
                <FormButtonBox primaryText={intl.formatMessage({ id: "general.action.submit.name" })} />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SupportForm;
