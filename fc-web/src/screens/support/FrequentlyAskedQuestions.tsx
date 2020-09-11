import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";

class FrequentlyAskedQuestions extends PureComponent {
  render() {
    return (
      <>
        <aside aria-hidden="true" tabIndex={-1}>
          <blockquote cite="https://www.goodreads.com/quotes/576394-no-we-have-been-as-usual-asking-the-wrong-question">
            <p>
              No; we have been as usual asking the wrong question. It does not matter a hoot what the mockingbird on the
              chimney is singing. The real and proper question is: Why is it beautiful?
              <br />
              &mdash; Annie Dillard, <cite>Pilgrim at Tinker Creek</cite>
            </p>
          </blockquote>
        </aside>
        <section id="repeal-account-suspension-or-ban">
          <Typography component="h3" variant="h6">
            How do I repeal an account suspension or ban?
          </Typography>
          <Typography variant="body2" paragraph>
            If your account has been suspended or banned, you should have received an email from us with details
            regarding the suspension/ban, including the necessary steps that you would need to be take to repeal it.
            Please follow the instructions from that email. If you have lost that email, the website will display the
            suspension/ban details when you attempt to sign in.
          </Typography>
        </section>
        <section id="reset-password">
          <Typography component="h3" variant="h6">
            How do I reset my password if I have forgotten it?
          </Typography>
          <Typography variant="body2" paragraph>
            You should navigate to the sign-in page, click the "Forgot Password?" button and follow the instructions
            accordingly. You will need to provide your email address to reset the password. Unfortunately, you may need
            to create a new Factibly account if you have forgotten your email address, or the password to your email
            account.
          </Typography>
        </section>
        <section id="conflict-of-interest">
          <Typography component="h3" variant="h6">
            How do I know that you do not have some conflict of interest that may bias some ratings?
          </Typography>
          <Typography variant="body2" paragraph>
            We apply the same grading scheme to every rating. We do <i>not</i> suspend or ban accounts on the sole basis
            that we disagree with their ratings and justifications unless it is clear that they are not taking their
            ratings seriously or are spamming pages with irrelevant ratings. You can file a support ticket for more
            information.
          </Typography>
        </section>
        <section id="multiple-accounts">
          <Typography component="h3" variant="h6">
            Am I permitted to create multiple accounts for myself?
          </Typography>
          <Typography variant="body2" paragraph>
            You are <i>not</i> permitted to create multiple accounts for yourself under any circumstance. You would be
            in violation of our Terms of Service &mdash; which everyone has surely read &#128580; &mdash; otherwise. If
            you have multiple accounts, you should file a support ticket with the emails and passwords of the duplicate
            accounts immediately. If you do so, you might receive a more lenient penalty. If you instead choose to wait
            it out and let us catch you, you will most likely receive a very long suspension or permanent ban.
          </Typography>
        </section>
        <section id="multiple-accounts">
          <Typography component="h3" variant="h6">
            When should I expect to receive a reply to my support ticket?
          </Typography>
          <Typography variant="body2" paragraph>
            We'll try to get back to you as soon as possible. If you haven't received a reply within 7 days but have
            been expecting one, you should file another support ticket.
          </Typography>
        </section>
        <section id="inactive-accounts">
          <Typography component="h3" variant="h6">
            Do you remove inactive accounts?
          </Typography>
          <Typography variant="body2" paragraph>
            We currently do not have a system in place that removes inactive accounts. Let's be honest though, why would
            you <i>not</i> be using Factibly frequently?
          </Typography>
        </section>
        <section id="woodchuck">
          <Typography component="h3" variant="h6">
            How much wood could a woodchuck chuck if a woodchuck could chuck wood?
          </Typography>
          <Typography variant="body2" paragraph>
            According to a study at Cornell University, a woodchuck would be able to chuck approximately 700 pounds of
            wood.
          </Typography>
        </section>
      </>
    );
  }
}

export default FrequentlyAskedQuestions;
