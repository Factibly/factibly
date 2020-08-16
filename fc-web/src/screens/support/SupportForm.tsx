import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showTicketSubmissionSuccess, showTicketSubmissionFail } from "../../store/support/actions";
import { RootState } from "../../store/rootReducer";
import { useIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
import emailjs from "emailjs-com";
import FakeCheckInput from "../../common/FakeCheckInput";
import FormButtonBox from "../../common/FormButtonBox";
import FakeCheckCalendarPicker from "../../common/FakeCheckCalendarPicker";
import FakeCheckErrorMessage from "../../common/FakeCheckErrorMessage";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import Banner from "../../common/Banner";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormGroup, TextField } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DateTimePicker } from "@material-ui/pickers";
import supportPrompts, { SupportText } from "../../static/data/support-prompts";
import { SupportFormValues, initialValues, SupportFormValidation } from "../../utils/forms/support-form-helper";

interface SupportFormProps {
  supportText: SupportText;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      margin: theme.spacing(2, 0),
      "& > *": {
        margin: theme.spacing(0, 0, 3),
      },
    },
  })
);

var topic = "";

const SupportForm = ({ supportText }: SupportFormProps) => {
  const dispatch = useDispatch();
  const ticketSubmitStatus = useSelector((state: RootState) => state.supportReducer.ticketSubmitStatus);

  const classes = useStyles();
  const intl = useIntl();

  const translatedTopics = [...supportText.topics, "general.form.field.other"]
    .map(id => intl.formatMessage({ id }))
    .sort();

  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
  const handleCloseConfirmationDialog = (alsoSendTicket: boolean = false, values?: SupportFormValues) => {
    if (alsoSendTicket) {
      if (
        process.env.REACT_APP_EMAILJS_USER_ID &&
        process.env.REACT_APP_EMAILJS_SERVICE_ID &&
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID
      ) {
        const template_params = {
          reply_to: values?.email,
          category: supportText.nameDefault?.toUpperCase(),
          topic,
          title: values?.title,
          date: values?.occurrenceDate.toString(),
          description: values?.description,
        };
        emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
        emailjs
          .send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, template_params)
          .then(
            () => showTicketSubmissionSuccess()(dispatch),
            () => showTicketSubmissionFail()(dispatch)
          );
      } else {
        showTicketSubmissionFail()(dispatch);
      }
    }
    setOpenConfirmationDialog(false);
  };

  return (
    <>
      {ticketSubmitStatus?.submitted && (
        <Banner
          message={intl.formatMessage({ id: ticketSubmitStatus.messageId })}
          backgroundColor={ticketSubmitStatus.backgroundColor}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleOpenConfirmationDialog}
        validate={values =>
          new SupportFormValidation(
            values,
            intl.formatMessage({ id: "general.form.msg.requiredField" }),
            intl.formatMessage({ id: "support.form.msg.email.invalidFormat" })
          ).validate()
        }
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
                open={openConfirmationDialog}
                onCancel={() => handleCloseConfirmationDialog()}
                onReject={() => handleCloseConfirmationDialog(false)}
                onApprove={() => handleCloseConfirmationDialog(true, values)}
              />
              <Form onSubmit={onSubmit}>
                <FormGroup className={classes.formGroup}>
                  <Autocomplete
                    options={translatedTopics}
                    groupBy={option => {
                      const firstLetter = option.charAt(0)?.toUpperCase();
                      return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
                    }}
                    onInputChange={(_, value) => {
                      topic = value;
                    }}
                    autoComplete
                    openOnFocus
                    disableClearable
                    renderInput={(params: any) => (
                      <Field
                        as={TextField}
                        {...params}
                        variant="outlined"
                        label={intl.formatMessage({ id: "support.form.field.topic" })}
                        fullWidth
                        error={formSubmit && !topic}
                        helperText={
                          formSubmit && !topic ? (
                            <FakeCheckErrorMessage
                              id={intl.formatMessage({ id: "support.form.field.topic" })}
                              msg={intl.formatMessage({ id: "general.form.msg.requiredField" })}
                            />
                          ) : (
                            supportText.helperTexts?.topic && intl.formatMessage({ id: supportText.helperTexts?.topic })
                          )
                        }
                        aria-required="true"
                      />
                    )}
                  />
                  <Field
                    as={FakeCheckInput}
                    name="email"
                    label={intl.formatMessage({ id: "support.form.field.email" })}
                    errorMsg={errors.email}
                    aria-required="true"
                  />
                  <Field
                    as={FakeCheckInput}
                    name="title"
                    label={intl.formatMessage({ id: "support.form.field.title" })}
                    errorMsg={errors.title}
                    aria-required="true"
                  />
                  <Field
                    as={FakeCheckInput}
                    name="description"
                    label={intl.formatMessage({ id: "support.form.field.description" })}
                    multiline
                    rows={10}
                    errorMsg={errors.description}
                    helperText={
                      supportText.helperTexts?.description &&
                      intl.formatMessage({ id: supportText.helperTexts?.description })
                    }
                  />
                  {supportPrompts.bug.id === supportText.id && (
                    <FakeCheckCalendarPicker
                      Picker={DateTimePicker}
                      label={intl.formatMessage({ id: "support.form.field.occurrenceTime" })}
                      selectedDate={values?.occurrenceDate}
                      onChange={(date: MaterialUiPickersDate) =>
                        setFieldValue("occurrenceDate", date || new Date(), true)
                      }
                      helperText={intl.formatMessage({ id: supportText.helperTexts?.bugTime })}
                    />
                  )}
                </FormGroup>
                <FormButtonBox primaryText={intl.formatMessage({ id: "general.action.submit" })} />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SupportForm;
