import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FeedbackIcon from "@material-ui/icons/Feedback";
import BugReportIcon from "@material-ui/icons/BugReport";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

interface SupportCategory {
  id: string;
  nameId: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface SupportPrompts extends SupportCategory {
  discriminator: "support" | "faq";
  nameDefault: string;
  subtitleId?: string;
  categoryIds: string[];
  helperIds?: { category?: string; description?: string; bugTime?: string };
}

export interface FaqPrompts extends SupportCategory {
  discriminator: "faq";
}

export function isSupportPrompt(arg: any): arg is SupportPrompts {
  return arg.discriminator === "support";
}

const supports: (SupportPrompts | FaqPrompts)[] = [
  {
    discriminator: "faq",
    id: "faq",
    nameId: "support.tabs.item.faq",
    icon: SpeakerNotesIcon,
  },
  {
    discriminator: "support",
    id: "help",
    nameId: "support.tabs.item.help",
    nameDefault: "Help",
    icon: ContactSupportIcon,
    categoryIds: [
      "support.help.category.accessibility",
      "support.help.category.account.fraud",
      "support.help.category.account.inappDisplayName",
      "support.help.category.account.multiAccount",
      "support.help.category.account.privacy",
      "support.help.category.account.settings",
      "support.help.category.discriminatory.employees",
      "support.help.category.discriminatory.users",
      "support.help.category.diversity",
      "support.help.category.factCheck.inAppComments",
      "support.help.category.factCheck.query",
      "support.help.category.factCheck.spam",
      "support.help.category.harassment.employees",
      "support.help.category.harassment.users",
      "support.help.category.nav.issue",
      "support.help.category.search.misleading",
    ],
    helperIds: {
      category: "support.form.field.category.help",
    },
  },
  {
    discriminator: "support",
    id: "feedback",
    nameId: "support.tabs.item.feedback",
    nameDefault: "Feedback",
    icon: FeedbackIcon,
    categoryIds: [
      "support.feedback.category.accessibility",
      "support.feedback.category.account.customization",
      "support.feedback.category.account.registrationProcess",
      "support.feedback.category.factCheck.gradingSystem",
      "support.feedback.category.factCheck.readershipTrends",
      "support.feedback.category.factCheck.userRatings",
      "support.feedback.category.localization",
      "support.feedback.category.privacy",
      "support.feedback.category.search",
      "support.feedback.category.security",
      "support.feedback.category.support",
    ],
    helperIds: {
      category: "support.form.field.category.help",
    },
  },
  {
    discriminator: "support",
    id: "bug-report",
    nameId: "support.tabs.item.bugReport",
    nameDefault: "Bug Report",
    subtitleId: "support.bugReport.subtitle",
    icon: BugReportIcon,
    categoryIds: ["support.bugReport.category.ui", "support.bugReport.category.ux"],
    helperIds: {
      category: "support.form.field.category.help",
      description: "support.form.field.description.bugReport.help",
      bugTime: "support.form.field.occurrenceTime.help",
    },
  },
];

export default supports;
