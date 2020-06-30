import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import FeedbackIcon from "@material-ui/icons/Feedback";
import BugReportIcon from "@material-ui/icons/BugReport";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

interface HelperText {
  topic?: string;
  des?: string;
  bugTime?: string;
}

interface QuestAns {
  question: string;
  answer: string;
}

interface SupportCategory {
  id: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface SupportText extends SupportCategory {
  discriminator: "support-text";
  topics: string[];
  helperTexts?: HelperText;
}

export interface FaqText extends SupportCategory {
  discriminator: "faq-text";
  questAns: QuestAns[];
}

export interface SupportTexts {
  help: SupportText;
  feedback: SupportText;
  bug: SupportText;
  faq: FaqText;
}

export function isSupportText(object: any): object is SupportText {
  return object.discriminator === "support-text";
}

const supportTexts: SupportTexts = {
  faq: {
    discriminator: "faq-text",
    id: "",
    name: "FAQ",
    icon: SpeakerNotesIcon,
    questAns: [
      {
        question: "How do I repeal an account suspension or ban?",
        answer: `
          If your account has been suspended or banned, you should have received an email from us detailing the suspension/ban,
          including the necessary steps that need to be taken to repeal it. Please follow the instructions from that email. If
          you have lost that email, the website will display the suspension/ban details when you attempt to sign in.
          ${"You are not permitted to file a standard support ticket if your account is suspended or banned.".bold()}`
      },
      {
        question: "How do I reset my password if I have forgotten it?",
        answer: `
          You should navigate to the sign-in page, click the "Forgot Password?" button and follow the instructions
          accordingly. You will need to provide your email address to reset the password. Unfortunately, you may need
          to create a new FakeCheck account if you have forgotten your email address, or the password to your email account`
      },
      {
        question: "How do I know that you do not have some conflict of interest that may bias some ratings?",
        answer: `
          We apply the same grading scheme to every rating. We do ${"not".italics()} suspend or ban accounts on the sole
          basis that we disagree with their ratings and justifications unless it is clear that they are not taking their
          rating seriously or are spamming ratings. You can file a support ticket for more information.`
      },
      {
        question: "Am I permitted to create multiple accounts for myself?",
        answer: `
          You are ${"not".italics()} permitted to create multiple accounts for yourself ${"under any circumstance".bold()}.
          You would be in violation of our Terms of Service &mdash; which everyone has surely read &#128580; &mdash;
          otherwise. If you have multiple accounts, you have two options:
          <ul>
            <li> File a support ticket with the emails and passwords of the duplicate accounts <b> immediately </b> </li>
            <li> Do nothing and wait to be caught by our moderators </li>
          </ul>
          If you choose the first option, you will receive either no penalty or a more leninent penalty unless you have
          been caught with multiple accounts many times. If you choose the second option, you will most likely receive a
          very long suspension or permanent ban. Jason will also tell your friends and family about your shameful act
          (fortunately though, he doesn't know your friends and family unless he also knows you personally because he
          would have to violate our Privacy Policy to have that knowledge).`
      },
      {
        question: "When should I expect to receive a reply to my support ticket?",
        answer: `
          We'll try to get back to you as soon as possible. If you haven't received a reply within
          7 days but have been expecting one, you should file another support ticket.`
      },
      {
        question: "Why do I need an account to file a support ticket?",
        answer: `
          This requirement prevents bots from spamming our support email and ensures that we have your
          email address in the event that we want to reply back to you.`
      },
      {
        question: "What alternative methods are there to file a support ticket other than through the provided forms?",
        answer: "There are currently no alternatives."
      },
      {
        question: "Who at Sapphire Labs will be responding to my support ticket?",
        answer: `
          This depends on which team member is available for support. If a particular team member cannot fulfill your
          support ticket, then that member will simply pass it down to someone else.`
      },
      {
        question: "Do you remove inactive accounts?",
        answer: `
          We currently do not have a system in place that removes inactive accounts. Let's be honest though,
          why would you ${"not".italics()} be using FakeCheck frequently?`
      },
      {
        question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
        answer: `
          According to a study at Cornell University, a woodchuck would be able to chuck approximately 700 pounds of wood.`
      }
    ]
  },
  help: {
    discriminator: "support-text",
    id: "help",
    name: "support",
    icon: ContactSupportIcon,
    topics: [
      "Accessibility",
      "Account (Fraud)",
      "Account (Inapproriate Display Name)",
      "Account (Inapproriate Profile Picture)",
      "Account (Multiple Accounts)",
      "Account (Privacy)",
      "Account (Settings)",
      "Navigation Issue",
      "Ratings (Spam or Bots)",
      "Ratings (Query)",
      "Ratings (Inapproriate Comments)",
      "Link Broken",
      "Search Misleading",
      "Harassement –– Users",
      "Harassement –– Employees",
      "Discriminatory Practice –– Users",
      "Discriminatory Practice –– Employees"
    ],
    helperTexts: {
      topic: "Choose the most relevant topic; choose 'Other' if you don't see your topic"
    }
  },
  feedback: {
    discriminator: "support-text",
    id: "feedback",
    name: "feedback",
    icon: FeedbackIcon,
    topics: [
      "Accessibility",
      "Internationalization",
      "Privacy",
      "Security",
      "Account (Customization)",
      "Account (Registration Process)",
      "Ratings (Grading System)",
      "Ratings (Media Source)",
      "Ratings (Viewing Trends)",
      "Ratings (Posts)",
      "Ratings (Hotspot Locations)",
      "RealUp Corner (Resources and Learning)",
      "RealUp Corner (Quizzes)",
      "FakeCheck Search",
      "FakeCheck Blog",
      "Customer Support"
    ],
    helperTexts: {
      topic: "Choose the most relevant topic; choose 'Other' if you don't see your topic"
    }
  },
  bug: {
    discriminator: "support-text",
    id: "bug-report",
    name: "bug report",
    icon: BugReportIcon,
    topics: ["User Interface", "User Experience"],
    helperTexts: {
      topic: "Choose the most relevant topic; choose 'Other' if you don't see your topic",
      des: `
        Be specific, and if possible, inform us of what you were doing on the site just
        before you experienced the bug and the necessary steps required to reproduce the bug`,
      bugTime: "Provide a rough estimate as to when you experienced this bug"
    }
  }
};

export default supportTexts;
