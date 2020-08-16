import React, { PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import locales from "../static/locales";

interface FakeCheckCalendarPickerProps extends WrappedComponentProps<"intl"> {
  Picker: typeof DatePicker | typeof TimePicker | typeof DateTimePicker;
  label: React.ReactNode;
  selectedDate?: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
  helperText?: React.ReactNode;
  [x: string]: any;
}

class FakeCheckCalendarPicker extends PureComponent<FakeCheckCalendarPickerProps> {
  render() {
    const { Picker, label, selectedDate, onChange, helperText, intl, ...otherProps } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locales[intl.locale].date}>
        <Picker
          variant="inline"
          inputVariant="outlined"
          disableFuture
          label={label}
          value={selectedDate}
          onChange={onChange}
          PopoverProps={{
            anchorOrigin: { horizontal: "left", vertical: "center" },
            transformOrigin: { horizontal: "left", vertical: "center" },
          }}
          helperText={helperText}
          {...otherProps}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default injectIntl(FakeCheckCalendarPicker);
