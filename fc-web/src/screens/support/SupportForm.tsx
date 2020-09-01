import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitToAsana } from "../../store/support/actions";
import { RootState } from "../../store/rootReducer";
import { useIntl } from "react-intl";
import { Formik, Form, Field } from "formik";
import FcInput from "../../common/FcInput";
import FormButtons from "../../common/FormButtons";
import FcCalendarPicker from "../../common/FcCalendarPicker";
import FcErrorMessage from "../../common/FcErrorMessage";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import Banner from "../../common/Banner";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormGroup, TextField, Typography, Card, CardContent, CardActions, Button } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DateTimePicker } from "@material-ui/pickers";
import GitHubIcon from "@material-ui/icons/GitHub";
import { SupportPrompts } from "../../static/data/supports";
import { SupportFormValues, initialValues, SupportFormValidation } from "../../utils/forms/support-form-helper";

interface SupportFormProps {
  support: SupportPrompts;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      margin: theme.spacing(2, 0),
      "& > *": {
        margin: theme.spacing(0, 0, 3),
      },
    },
    card: {
      marginBottom: theme.spacing(5),
    },
  })
);

var category = "";

const SupportForm = ({ support }: SupportFormProps) => {
  const dispatch = useDispatch();
  const ticketSubmitStatus = useSelector((state: RootState) => state.supportReducer.ticketSubmitStatus);

  const classes = useStyles();
  const intl = useIntl();

  const translatedCategories = [...support.categoryIds, "general.form.field.other"]
    .map(id => intl.formatMessage({ id }))
    .sort();

  const [formSubmit, setFormSubmit] = useState<boolean>(false);
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
  const handleCloseConfirmationDialog = (alsoSendTicket: boolean = false, values?: SupportFormValues) => {
    if (alsoSendTicket) {
      submitToAsana(support.nameDefault, category, values)(dispatch);
      setSubmissionLoading(true);
    }
    setOpenConfirmationDialog(false);
  };

  useEffect(() => {
    if (ticketSubmitStatus.submitted) {
      setSubmissionLoading(false);
    }
  }, [ticketSubmitStatus.submitted]);

  return (
    <>
      {ticketSubmitStatus.submitted && (
        <Banner
          role="alert"
          severity={ticketSubmitStatus.success ? "success" : "error"}
          message={intl.formatMessage({ id: ticketSubmitStatus.messageId })}
        >
          {ticketSubmitStatus.ticketId && (
            <>
              {intl.formatMessage({ id: "support.ticket.number" })}: {ticketSubmitStatus.ticketId}
            </>
          )}
        </Banner>
      )}
      {support.subtitleId && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1">{intl.formatMessage({ id: support.subtitleId })}</Typography>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<GitHubIcon />}
              href="https://github.com/Sapphire-Labs/factibly/issues"
              target="_blank"
              rel="noreferrer noopener"
            >
              {intl.formatMessage({ id: "general.action.github.issue.create" })}
            </Button>
          </CardActions>
        </Card>
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
            if (translatedCategories?.includes(category)) {
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
                    options={translatedCategories}
                    groupBy={option => {
                      const firstLetter = option.charAt(0)?.toUpperCase();
                      return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
                    }}
                    defaultValue={translatedCategories[0]}
                    onInputChange={(_, value) => {
                      category = value;
                    }}
                    autoComplete
                    openOnFocus
                    disableClearable
                    renderInput={(params: any) => (
                      <Field
                        as={TextField}
                        {...params}
                        variant="outlined"
                        label={intl.formatMessage({ id: "support.form.field.category" })}
                        fullWidth
                        error={formSubmit && !category}
                        helperText={
                          formSubmit && !category ? (
                            <FcErrorMessage
                              id={intl.formatMessage({ id: "support.form.field.category" })}
                              msg={intl.formatMessage({ id: "general.form.msg.requiredField" })}
                            />
                          ) : (
                            support.helperIds?.category && intl.formatMessage({ id: support.helperIds?.category })
                          )
                        }
                        aria-required="true"
                      />
                    )}
                  />
                  <Field
                    as={FcInput}
                    name="title"
                    label={intl.formatMessage({ id: "support.form.field.title" })}
                    errorMsg={errors.title}
                    aria-required="true"
                  />
                  <Field
                    as={FcInput}
                    name="email"
                    label={intl.formatMessage({ id: "support.form.field.email" })}
                    errorMsg={errors.email}
                    helperText={intl.formatMessage({ id: "support.form.field.email.help" })}
                  />
                  <Field
                    as={FcInput}
                    name="description"
                    label={intl.formatMessage({ id: "support.form.field.description" })}
                    multiline
                    rows={10}
                    errorMsg={errors.description}
                    helperText={
                      support.helperIds?.description && intl.formatMessage({ id: support.helperIds?.description })
                    }
                  />
                  {support.id === "bug-report" && (
                    <FcCalendarPicker
                      Picker={DateTimePicker}
                      label={intl.formatMessage({ id: "support.form.field.occurrenceTime" })}
                      selectedDate={values?.occurrenceDate}
                      onChange={(date: MaterialUiPickersDate) =>
                        setFieldValue("occurrenceDate", date || new Date(), true)
                      }
                      helperText={intl.formatMessage({ id: support.helperIds?.bugTime })}
                    />
                  )}
                </FormGroup>
                <FormButtons
                  primaryText={intl.formatMessage({ id: "general.action.submit" })}
                  isLoading={submissionLoading}
                  loadingText={intl.formatMessage({ id: "general.state.submitting" })}
                />
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SupportForm;
