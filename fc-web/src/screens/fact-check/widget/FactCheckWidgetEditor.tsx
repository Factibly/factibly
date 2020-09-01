import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useIntl } from "react-intl";
import { isWindows, isMacOs } from "react-device-detect";
import TextActionBar from "../../../common/TextActionBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FilledInput,
  InputAdornment,
  Button,
  Checkbox,
} from "@material-ui/core";
import { useAlert } from "../../../hooks/useAlert";
import iframePrts from "../../../static/data/fact-check-iframe-properties";
import { InputType } from "../../../static/enums";

interface FactCheckWidgetEditorProps {
  open: boolean;
  onClose: () => any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      width: 512,
    },
    legend: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    paramInputInput: {
      padding: theme.spacing(1),
    },
  })
);

const FactCheckWidgetEditor = ({ open, onClose }: FactCheckWidgetEditorProps) => {
  const locale: string = useSelector((state: RootState) => state.settingsReducer.locale);

  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const urlSearchParams = new URLSearchParams(`layout=1&locale=${locale || intl.locale}`);
  const [iframeUrl, setIframeUrl] = useState<string>(`${window.location.href}?${urlSearchParams.toString()}`);
  const handleCopyIframeUrl = () => {
    navigator.clipboard.writeText(iframeUrl);
    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "factCheck.widget.alert.msg.linkCopied" }),
    });
  };
  const updateIframeUrl = () => setIframeUrl(`${window.location.href}?${urlSearchParams.toString()}`);

  const [propertyValues, setPropertyValues] = useState<{ [x: string]: string }>({
    [iframePrts.max.property]: iframePrts.max.defaultValue,
    [iframePrts.height.property]: iframePrts.height.defaultValue,
    [iframePrts.width.property]: iframePrts.width.defaultValue,
  });
  const handlePropertyValuesChange = (event: any, property: string) => {
    urlSearchParams.set(property, event.target.value);
    updateIframeUrl();
    setPropertyValues({ ...propertyValues, [property]: event.target.value });
  };

  const [useDefaults, setUseDefaults] = useState<{ [x: string]: boolean }>({
    [iframePrts.max.property]: true,
    [iframePrts.height.property]: true,
    [iframePrts.width.property]: true,
  });
  const handleUseDefaultsChange = (property: string) => {
    if (useDefaults[property]) {
      urlSearchParams.append(property, propertyValues[property].toString());
    } else {
      urlSearchParams.delete(property);
    }
    updateIframeUrl();
    setUseDefaults({ ...useDefaults, [property]: !useDefaults[property] });
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={onClose}
      aria-labelledby="widget-editor-form-title"
      aria-describedby="widget-editor-form-description"
    >
      <DialogTitle id="widget-editor-form-title">{intl.formatMessage({ id: "general.action.embed" })}</DialogTitle>
      <DialogContent id="widget-editor-form-description">
        <DialogContentText>
          Use this editor to adjust the iframe based on your specifications. Then, copy the URL to your computer's
          clipboard (click the "COPY" button
          {(isWindows || isMacOs) && (
            <>
              , or select the URL and press {isWindows && <kbd>Ctrl</kbd>} {isMacOs && <kbd>Cmd</kbd>}&nbsp;+&nbsp;
              <kbd>C</kbd>
            </>
          )}
          ).
          <br />
          <em>
            WARNING: The URL will <strong> not </strong> be saved when you exit this editor
          </em>
        </DialogContentText>
        <TextActionBar
          value={iframeUrl}
          actionName={intl.formatMessage({ id: "general.action.copy" })}
          onActionClick={handleCopyIframeUrl}
          aria-label="iframe url"
        />
        <form noValidate>
          {Object.values(iframePrts).map(({ property, nameId, inputType, defaultValue, checkboxLabelId, unit }) => {
            if (inputType !== InputType.EDITABLE) {
              return null;
            }
            const label = intl.formatMessage({ id: nameId });
            return (
              <Box component="fieldset" key={`iframe-${property}`} py={1} my={2} border={1} borderColor="divider">
                <FormLabel component="legend" className={classes.legend}>
                  {label}
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`checked-fact-check-widget-${property}`}
                        checked={useDefaults[property]}
                        onChange={() => handleUseDefaultsChange(property)}
                        inputProps={{
                          "aria-label": intl.formatMessage(
                            { id: "general.prompt.useDefault.aria" },
                            { name: label.toLocaleLowerCase(locale || intl.locale) }
                          ),
                        }}
                      />
                    }
                    label={intl.formatMessage({ id: checkboxLabelId })}
                  />
                  <FilledInput
                    type="number"
                    classes={{ input: classes.paramInputInput }}
                    defaultValue={defaultValue}
                    onChange={event => handlePropertyValuesChange(event, property)}
                    disabled={useDefaults[property]}
                    endAdornment={unit && <InputAdornment position="end"> {unit} </InputAdornment>}
                    inputProps={{
                      "aria-label": `iframe ${label.toLocaleLowerCase(locale || intl.locale)}`,
                    }}
                  />
                </FormGroup>
              </Box>
            );
          })}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{intl.formatMessage({ id: "general.action.exit" })}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FactCheckWidgetEditor;
