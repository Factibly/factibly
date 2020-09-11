import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import DOMPurify from "dompurify";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { CONTENT_REFERENCES_LIST } from "../../gql/queries";
import { ContentReferencesList } from "../../gql/__generated__/ContentReferencesList";
import { useCustomLazyQuery } from "../../hooks/gql";
import { useAlert } from "../../hooks/useAlert";

interface ReferenceGeneratorProps {
  contentId: string;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outputText: {
      msUserSelect: "none",
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      userSelect: "none",
    },
    highlightedText: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.common.white,
      "&::placeholder": {
        color: grey[300],
      },
    },
    copyButton: {
      borderRadius: 0,
    },
  })
);

const generateFillinId = (inputCounter: number) => `reference-generator-fillin-input-${inputCounter}`;

function formatReference(htCz: string, reference: string | null | undefined) {
  let inputCounter = 0;
  DOMPurify.addHook("afterSanitizeAttributes", node => {
    if (node.tagName === "INPUT") {
      node.setAttribute("id", generateFillinId(inputCounter));
      node.setAttribute("class", htCz);
      node.setAttribute("autocomplete", "off");
      node.setAttribute("aria-label", "unknown ".concat(node.getAttribute("placeholder") || "reference field"));
      inputCounter++;
    }
  });
  const res = DOMPurify.sanitize(reference ?? "", {
    ALLOWED_TAGS: ["i", "input", "br"],
    ALLOWED_ATTR: ["placeholder"],
  });
  DOMPurify.removeHook("afterSanitizeAttributes");
  return res;
}

function copyReference() {
  let str = "";
  let inputCounter = 0;
  DOMPurify.addHook("beforeSanitizeAttributes", node => {
    if (node.tagName === "INPUT") {
      str += (document.getElementById(generateFillinId(inputCounter)) as HTMLInputElement).value;
      inputCounter++;
    } else if (node.nodeName === "#text") {
      str += node.textContent;
    }
  });
  DOMPurify.sanitize(document.getElementById("reference-generator-output-text")?.outerHTML ?? "", { IN_PLACE: true });
  DOMPurify.removeHook("beforeSanitizeAttributes");
  navigator.clipboard.writeText(str);
}

const ReferenceGenerator = ({ contentId, open, onClose }: ReferenceGeneratorProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [getReferences, { loading: referenceLoading, data: referenceData }] = useCustomLazyQuery<ContentReferencesList>(
    CONTENT_REFERENCES_LIST,
    {
      variables: { contentId },
    }
  );
  const references = referenceData?.content?.referenceSet;

  const [selectedCitationStyle, setSelectedCitationStyle] = useState<number>(0);
  const handleCitationStyleChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setSelectedCitationStyle(event.target.value as number);

  const handleCitationCopyClick = () => {
    const reference = references?.length && references[selectedCitationStyle]?.reference;
    if (reference) {
      copyReference();
      setAlert({
        severity: "success",
        message: intl.formatMessage({ id: "factCheck.widget.alert.link.copy.success" }),
      });
    }
  };

  useEffect(() => {
    if (open) getReferences();
  }, [open, getReferences]);

  if (referenceLoading) return <div />;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="reference-generator-title"
      aria-describedby="reference-generator-description"
    >
      <DialogTitle id="reference-generator-title">{intl.formatMessage({ id: "factCheck.cite" })}</DialogTitle>
      <DialogContent id="reference-generator-description">
        {references?.length && (
          <>
            <TextField
              id="citation-style-selector"
              select
              label={intl.formatMessage({ id: "factCheck.cite.style" })}
              value={selectedCitationStyle}
              onChange={handleCitationStyleChange}
              variant="outlined"
              fullWidth
            >
              {references.map((reference, index) => (
                <MenuItem key={`citation-style-${reference?.style}`} value={index}>
                  {reference?.style}
                </MenuItem>
              ))}
            </TextField>
            <Box component="div" my={2}>
              <Box component="div" p={3} border={1}>
                <DialogContentText
                  id="reference-generator-output-text"
                  className={classes.outputText}
                  variant="body1"
                  color="textPrimary"
                  dangerouslySetInnerHTML={{
                    __html: formatReference(classes.highlightedText, references[selectedCitationStyle]?.reference),
                  }}
                />
              </Box>
              <Button
                className={classes.copyButton}
                variant="outlined"
                startIcon={<AssignmentIcon />}
                onClick={handleCitationCopyClick}
                fullWidth
              >
                {intl.formatMessage({ id: "general.action.copy" })}
              </Button>
            </Box>
            <DialogContentText variant="body2">
              This reference should only be treated as a template. Please double check that all fields are correct. Any
              field marked in <span className={classes.highlightedText}>blue</span> indicates that the generator was not
              able to determine its value and that you can, and should, manually changed its value. When you click on
              the "COPY" button, the text will be automatically formatted for you.
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{intl.formatMessage({ id: "general.action.exit" })}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReferenceGenerator;
