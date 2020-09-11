import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/rootReducer";
import DateFnsUtils from "@date-io/date-fns";
import { DatePickerProps, TimePickerProps, DateTimePickerProps, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import locales from "../static/locales";

interface FcCalendarPickerProps {
  Picker: React.FC<DatePickerProps> | React.FC<TimePickerProps> | React.FC<DateTimePickerProps>;
  label: React.ReactNode;
  selectedDate?: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
  helperText?: React.ReactNode;
  locale: string;
  [x: string]: any;
}

class FcCalendarPicker extends PureComponent<FcCalendarPickerProps> {
  render() {
    const { Picker, label, selectedDate, onChange, helperText, locale, ...otherProps } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locales[locale].date}>
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

const mapStateToProps = (state: RootState) => ({
  locale: state.settingsReducer.locale,
});

export default connect(mapStateToProps)(FcCalendarPicker);
