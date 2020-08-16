import { InputType } from "../enums";

const factCheckIframeProperties = {
  locale: {
    property: "locale",
    nameId: "factCheck.widget.property.locale",
    inputType: InputType.FIXED,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: undefined,
  },
  max: {
    property: "max",
    nameId: "factCheck.widget.property.max",
    inputType: InputType.EDITABLE,
    defaultValue: "10",
    checkboxLabelId: "general.unit.none",
    unit: undefined,
  },
  height: {
    property: "height",
    nameId: "factCheck.widget.property.height",
    inputType: InputType.EDITABLE,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: "px",
  },
  width: {
    property: "width",
    nameId: "factCheck.widget.property.width",
    inputType: InputType.EDITABLE,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: "px",
  },
};

export default factCheckIframeProperties;
