import React, { useState, forwardRef } from "react";
import { useIntl } from "react-intl";
import { Formik, Form, Field, FormikErrors } from "formik";
import emailjs from "emailjs-com";
import DateFnsUtils from "@date-io/date-fns";
import TextInput from "../../common/TextInput";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import {
  Box,
  FormGroup,
  Button,
  TextField,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import supportTexts, { SupportText } from "../../text/support-texts";
import ErrorMessage from "../../common/ErrorMessage";
import "../../styles/universal.css";

interface SendConfirmationDialogProps {
  values: SupportFormValues;
}

interface SupportFormValues {
  title: string;
  des: string;
}

interface SupportFormProps {
  supportText: SupportText;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var topic = "";

const SupportForm = ({ supportText }: SupportFormProps) => {
  const intl = useIntl();
  const [formSubmit, setFormSubmit] = useState(false);
  const [ticketSendStatus, setTicketSendStatus] = useState({ msg: "", backgroundColor: "inherit" });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toString());

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (alsoSendTicket: boolean = false, values?: SupportFormValues) => {
    if (alsoSendTicket) {
      const template_params = {
        category: supportText.name?.toUpperCase(),
        topic,
        title: values?.title,
        date: selectedDate,
        des: values?.des
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
            setTicketSendStatus({
              msg: `
                Thank you! We have received your ${supportText.name} ticket and
                will try to back get to you as soon as possible.`,
              backgroundColor: "green"
            });
          },
          () => {
            setTicketSendStatus({
              msg: `Something went wrong; your ${supportText.name} ticket didn't get send to us. Please try again later.`,
              backgroundColor: "red"
            });
          }
        );
    }
    setOpenDialog(false);
  };

  const handleTopicChange = (value: string) => {
    topic = value;
  };

  const validate = (values: SupportFormValues) => {
    let errors: FormikErrors<SupportFormValues> = {};
    const requiredFieldMsg = intl.formatMessage({ id: "requiredField" });
    if (!values.title) {
      errors.title = requiredFieldMsg;
    }
    return errors;
  };

  const Banner = () => {
    const { msg, backgroundColor } = ticketSendStatus;
    return (
      <Paper variant="outlined" style={{ padding: 24, width: "100%", color: "white", backgroundColor }}>
        <Typography variant="h6" gutterBottom>
          {msg}
        </Typography>
      </Paper>
    );
  };

  const SendConfirmationDialog = ({ values }: SendConfirmationDialogProps) => (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => handleCloseDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description"> Are you sure? </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog(false)} color="primary">
          No
        </Button>
        <Button onClick={() => handleCloseDialog(true, values)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {ticketSendStatus.msg && <Banner />}
      <Formik
        initialValues={{
          title: "",
          des: "",
          dateTime: selectedDate
        }}
        onSubmit={handleClickOpenDialog}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, values, validateForm, submitForm }) => {
          const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFormSubmit(true);
            if (supportText.topics?.includes(topic)) {
              submitForm();
            } else {
              validateForm();
            }
          };
          const topicOptions = [...supportText.topics?.sort(), "Other"];
          return (
            <>
              <SendConfirmationDialog values={values} />
              <Form onSubmit={event => onSubmit(event)}>
                <FormGroup className="support-form">
                  <Autocomplete
                    disableClearable
                    openOnFocus
                    autoComplete
                    options={topicOptions}
                    getOptionLabel={(option: string) => option}
                    groupBy={option => {
                      const firstLetter = option.charAt(0)?.toUpperCase();
                      return /[0-9]/.test(firstLetter) ? "0-9" : firstLetter;
                    }}
                    onInputChange={(_, value) => handleTopicChange(value)}
                    renderInput={(params: any) => {
                      return (
                        <Field
                          as={TextField}
                          {...params}
                          fullWidth
                          label="Topic"
                          variant="outlined"
                          error={formSubmit && !topic}
                          helperText={
                            formSubmit && !topic ? (
                              <ErrorMessage msg={intl.formatMessage({ id: "requiredField" })} />
                            ) : (
                              supportText.helperTexts?.topic
                            )
                          }
                        />
                      );
                    }}
                  />
                  <Field as={TextInput} name="title" label="Title" errors={errors.title} />
                  <Field
                    as={TextInput}
                    name="des"
                    label="Description"
                    multiline
                    rows={10}
                    rowsMax={10}
                    errors={errors.des}
                    helperText={supportText.helperTexts?.des}
                  />
                  {supportTexts.bug.id === supportText.id && (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        variant="inline"
                        disableFuture
                        label="Estimated Time of Occurence"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={date => setSelectedDate(date?.toString() ?? new Date().toString())}
                        PopoverProps={{
                          anchorOrigin: { horizontal: "left", vertical: "center" },
                          transformOrigin: { horizontal: "left", vertical: "center" }
                        }}
                        helperText={supportText.helperTexts?.bugTime}
                      />
                    </MuiPickersUtilsProvider>
                  )}
                </FormGroup>
                <Box className="form-box">
                  <Button fullWidth type="submit" variant="contained" color="primary">
                    Send
                  </Button>
                </Box>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SupportForm;
