import React from "react";
import { mount } from "enzyme";
import { IntlProvider } from "react-intl";
import PasswordStrengthMeter from "./PasswordStrengthIndicator";
import messages from "../../static/messages/messages";

const locale = "en-US";
let wrapper: any;

const initPsmComponent = function initPsmComponent(password: string) {
  wrapper = mount(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <PasswordStrengthMeter password={password} />
    </IntlProvider>
  );
};

const matchMeterText = function matchMeterText(expected: string) {
  expect(wrapper.find("#password-strength").find("FormattedMessage").text()).toBe(expected);
};

const meetPasswordRequirement = function meetPasswordRequirement(index: number, expectedColour: string) {
  expect(
    wrapper
      .findWhere((node: any) => node.key() === `#pass-req-${index}`)
      .find("span")
      .prop("style")
  ).toHaveProperty("backgroundColor", expectedColour);
};

describe("Password Strength Popover", () => {
  it("indicate extremely weak password (0)", () => {
    initPsmComponent("a");
    matchMeterText("Extremely Weak");
  });

  it("indicate very weak password (1)", () => {
    initPsmComponent("sdffa");
    matchMeterText("Very Weak");
  });

  it("indicate weak password (2)", () => {
    initPsmComponent("sd234ffa");
    matchMeterText("Weak");
  });

  it("indicate adequate password (3)", () => {
    initPsmComponent("sd234ff313");
    matchMeterText("Adequate");
  });

  it("indicate strong password (4)", () => {
    initPsmComponent("sd234ff31332a");
    matchMeterText("Strong");
  });

  it("indicate password with length of 8 characters or more", () => {
    initPsmComponent("sd21a24jo");
    meetPasswordRequirement(0, "green");
  });

  it("indicate password with length of 7 characters or less", () => {
    initPsmComponent("sd21a24j");
    meetPasswordRequirement(0, "red");
  });

  it("indicate password with at least one uppercase letter", () => {
    initPsmComponent("sd21A24l83a");
    meetPasswordRequirement(1, "green");
  });

  it("indicate password with no uppercase letters", () => {
    initPsmComponent("sd215dfkjlmvpx");
    meetPasswordRequirement(1, "red");
  });

  it("indicate password with at least one number", () => {
    initPsmComponent("sdwpoajcmv2");
    meetPasswordRequirement(2, "green");
  });

  it("indicate password with no numbers", () => {
    initPsmComponent("sdwpoajcmvx");
    meetPasswordRequirement(2, "red");
  });

  // it("indicate password with no more than 3 consecutive identical characters", () => {
  //   initPsmComponent("sdwpoajcmv2qqq");
  //   meetPasswordRequirement(3, "green");
  // });

  // it("indicate password with more than 3 consecutive identical characters", () => {
  //   initPsmComponent("sdwpoajcmv2qqqq");
  //   meetPasswordRequirement(3, "red");
  // });
});
