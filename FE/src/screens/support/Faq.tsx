import React from "react";
import DOMPurify from "dompurify";
import { FaqText } from "../../text/support-texts";

interface FaqProps {
  faqText: FaqText;
}

const Faq = ({ faqText }: FaqProps) => {
  return (
    <>
      <blockquote cite="https://www.goodreads.com/quotes/576394-no-we-have-been-as-usual-asking-the-wrong-question">
        <p>
          No; we have been as usual asking the wrong question. It does not matter a hoot what the mockingbird on the
          chimney is singing. The real and proper question is: Why is it beautiful? <br />
          &mdash; Annie Dillard, <cite> Pilgrim at Tinker Creek </cite>
        </p>
      </blockquote>
      {faqText.questAns.map((qna, index) => (
        <div id={`qna-${index}`} key={`qna-${index}`}>
          <h6> {qna.question} </h6>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qna.answer) }} />
        </div>
      ))}
    </>
  );
};

export default Faq;
