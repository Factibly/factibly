import { InputType } from "../enums";

const factCheckIframeProperties = {
  locale: {
    property: "locale",
    nameId: "factCheck.widget.property.locale",
    nameAriaId: "factCheck.widget.property.locale.aria",
    inputType: InputType.FIXED,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: undefined,
  },
  max: {
    property: "max",
    nameId: "factCheck.widget.property.max",
    nameAriaId: "factCheck.widget.property.max.aria",
    inputType: InputType.EDITABLE,
    defaultValue: "10",
    checkboxLabelId: "general.unit.none",
    unit: undefined,
  },
  height: {
    property: "height",
    nameId: "factCheck.widget.property.height",
    nameAriaId: "factCheck.widget.property.height.aria",
    inputType: InputType.EDITABLE,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: "px",
  },
  width: {
    property: "width",
    nameId: "factCheck.widget.property.width",
    nameAriaId: "factCheck.widget.property.width.aria",
    inputType: InputType.EDITABLE,
    defaultValue: "",
    checkboxLabelId: "general.unit.default",
    unit: "px",
  },
};

export default factCheckIframeProperties;
