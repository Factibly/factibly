import React, { PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-CA";
import frLocale from "date-fns/locale/fr";
import zhCnLocale from "date-fns/locale/zh-CN";
import zhTwLocale from "date-fns/locale/zh-TW";
import jaLocale from "date-fns/locale/ja";
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface FakeCheckCalendarPickerProps extends WrappedComponentProps<"intl"> {
  Picker: typeof DatePicker | typeof TimePicker | typeof DateTimePicker;
  label: React.ReactNode;
  selectedDate?: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
  helperText?: React.ReactNode;
  [x: string]: any;
}

const localeMap = {
  en: enLocale,
  fr: frLocale,
  "zh-Hans": zhCnLocale,
  "zh-Hant": zhTwLocale,
  ja: jaLocale,
};

class FakeCheckCalendarPicker extends PureComponent<FakeCheckCalendarPickerProps> {
  render() {
    const { Picker, label, selectedDate, onChange, helperText, intl, ...props } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[intl.locale]}>
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
          {...props}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default injectIntl(FakeCheckCalendarPicker);
