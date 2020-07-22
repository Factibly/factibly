import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FeedbackIcon from "@material-ui/icons/Feedback";
import BugReportIcon from "@material-ui/icons/BugReport";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

interface HelperText {
  topic?: string;
  description?: string;
  bugTime?: string;
}

interface QuestAns {
  question: string;
  answer: string;
}

interface SupportCategory {
  id: string;
  nameId: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface SupportText extends SupportCategory {
  discriminator: "support-text";
  nameDefault: string;
  topics: string[];
  helperTexts?: HelperText;
}

export interface FaqText extends SupportCategory {
  discriminator: "faq-text";
  questAns: QuestAns[];
}

export interface SupportPrompts {
  help: SupportText;
  feedback: SupportText;
  bug: SupportText;
  faq: FaqText;
}

export function isSupportText(object: any): object is SupportText {
  return object.discriminator === "support-text";
}

const supportPrompts: SupportPrompts = {
  faq: {
    discriminator: "faq-text",
    id: "faq",
    nameId: "support.tabs.faq.name",
    icon: SpeakerNotesIcon,
    questAns: [
      {
        question: "How do I repeal an account suspension or ban?",
        answer: `
          If your account has been suspended or banned, you should have received an email from us with details regarding
          the suspension/ban, including the necessary steps that you would need to be take to repeal it. Please follow the
          instructions from that email. If you have lost that email, the website will display the suspension/ban details
          when you attempt to sign in.`,
      },
      {
        question: "How do I reset my password if I have forgotten it?",
        answer: `
          You should navigate to the sign-in page, click the "Forgot Password?" button and follow the instructions
          accordingly. You will need to provide your email address to reset the password. Unfortunately, you may need
          to create a new FakeCheck account if you have forgotten your email address, or the password to your email account.`,
      },
      {
        question: "How do I know that you do not have some conflict of interest that may bias some ratings?",
        answer: `
          We apply the same grading scheme to every rating. We do ${"not".italics()} suspend or ban accounts on the sole
          basis that we disagree with their ratings and justifications unless it is clear that they are not taking their
          ratings seriously or are spamming pages with irrelevant ratings. You can file a support ticket for more information.`,
      },
      {
        question: "Am I permitted to create multiple accounts for myself?",
        answer: `
          You are ${"not".italics()} permitted to create multiple accounts for yourself under any circumstance.
          You would be in violation of our Terms of Service &mdash; which everyone has surely read &#128580; &mdash;
          otherwise. If you have multiple accounts, you have two options:
          <ul>
            <li> File a support ticket with the emails and passwords of the duplicate accounts immediately </li>
            <li> Do nothing and wait to be caught by our moderators </li>
          </ul>
          If you choose the first option, you will receive either no penalty or a more leninent penalty unless you have
          been caught with multiple accounts many times. If you choose the second option, you will most likely receive a
          very long suspension or permanent ban. Jason will also tell your friends and family about your shameful act
          (fortunately though, he doesn't know your friends and family unless he also knows you personally because he
          would have to violate our Privacy Policy to have that knowledge).`,
      },
      {
        question: "When should I expect to receive a reply to my support ticket?",
        answer: `
          We'll try to get back to you as soon as possible. If you haven't received a reply within
          7 days but have been expecting one, you should file another support ticket.`,
      },
      {
        question: "What alternative methods are there to file a support ticket?",
        answer: `
          You can directly email us at <a href="mailto:sapphire.fakecheck@gmail.com">sapphire.fakecheck@gmail.com</a>.
          However, we are more likely to reply back to you with a more thorough response, and within a shorter
          time frame, if you file a support ticket through one of our <a href="#">support/feedback forms</a>.`,
      },
      {
        question: "Who at Sapphire Labs will be responding to my support ticket?",
        answer: `
          This depends on which team member is available for support. If a particular team member cannot fulfill your
          support ticket, then that member will simply pass it down to someone else.`,
      },
      {
        question: "Do you remove inactive accounts?",
        answer: `
          We currently do not have a system in place that removes inactive accounts. Let's be honest though,
          why would you ${"not".italics()} be using FakeCheck frequently?`,
      },
      {
        question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
        answer: `
          According to a study at Cornell University, a woodchuck would be able to chuck approximately 700 pounds of wood.`,
      },
    ],
  },
  help: {
    discriminator: "support-text",
    id: "help",
    nameId: "support.tabs.help.name",
    nameDefault: "Help",
    icon: ContactSupportIcon,
    topics: [
      "support.help.topic.accessibility.name",
      "support.help.topic.account.fraud.name",
      "support.help.topic.account.inappDisplayName.name",
      "support.help.topic.account.multiAccount.name",
      "support.help.topic.account.privacy.name",
      "support.help.topic.account.settings.name",
      "support.help.topic.discriminatory.employees.name",
      "support.help.topic.discriminatory.users.name",
      "support.help.topic.diversity.name",
      "support.help.topic.factCheck.inAppComments.name",
      "support.help.topic.factCheck.query.name",
      "support.help.topic.factCheck.spam.name",
      "support.help.topic.harassment.employees.name",
      "support.help.topic.harassment.users.name",
      "support.help.topic.nav.issue.name",
      "support.help.topic.search.misleading.name",
      "support.help.topic.url.broken.name",
    ],
    helperTexts: {
      topic: "support.form.field.topic.help",
    },
  },
  feedback: {
    discriminator: "support-text",
    id: "feedback",
    nameId: "support.tabs.feedback.name",
    nameDefault: "Feedback",
    icon: FeedbackIcon,
    topics: [
      "support.feedback.topic.accessibility.name",
      "support.feedback.topic.account.customization.name",
      "support.feedback.topic.account.registrationProcess.name",
      "support.feedback.topic.blog.name",
      "support.feedback.topic.factCheck.gradingSystem.name",
      "support.feedback.topic.factCheck.readershipTrends.name",
      "support.feedback.topic.factCheck.userRatings.name",
      "support.feedback.topic.internationalization.name",
      "support.feedback.topic.privacy.name",
      "support.feedback.topic.realUp.resources.name",
      "support.feedback.topic.realUp.quizzes.name",
      "support.feedback.topic.search.name",
      "support.feedback.topic.security.name",
      "support.feedback.topic.support.name",
    ],
    helperTexts: {
      topic: "support.form.field.topic.help",
    },
  },
  bug: {
    discriminator: "support-text",
    id: "bug-report",
    nameId: "support.tabs.bugReport.name",
    nameDefault: "Bug Report",
    icon: BugReportIcon,
    topics: ["support.bugReport.topic.ui.name", "support.bugReport.topic.ux.name"],
    helperTexts: {
      topic: "support.form.field.topic.help",
      description: "support.form.field.description.bugReport.help",
      bugTime: "support.form.field.occurrenceTime.help",
    },
  },
};

export default supportPrompts;
