import React from "react";
import Section from "../section/index";
import Who from "./Who";
import InjectHtml from "./InjectHtml";
import PropTypes from "prop-types";
import CardList from "../cardlist/";
import Title from "../shared/title";
import { Link } from "react-router-dom";
import ReadNextItem from "../readnext";
import TwoColumnGrid from "./sidebyside/";
import Video from "../shared/video";
import PageTitle from "../genericcontentpage/PageTitle";
//refactoring
//look at structure of api response for page
//remove env var setting and checks for now as I cannot pick them up on the server at the moment

function HomePage({ homePageProps, contentRef, classname }) {
  const {
    heroBanner: { body, title },
    PullQuote: { quote },
    BenefitsAndOpportunities,
    introParagraph,
    caseStudiesLink,
    benefitsSection,
    readNextLinks,
  } = homePageProps;

  let caseStudyLinks = [];
  caseStudyLinks.push(caseStudiesLink);

  return (
    <main id="content" ref={contentRef} className="main-container">
      <PageTitle title={""} />

      <div className="page-container">
        <Section headingText={title} bodyText={body} styleName="section" />
        <TwoColumnGrid
          id="right"
          leftSideContent={<InjectHtml paragraphText={introParagraph} />}
          rightSideContent={<Video name="oruk-video" height="250" />}
        />
        {caseStudiesLink && caseStudiesLink.id && (
          <p id="case-studies" className="card-content">
            <Link to={caseStudiesLink.url}>
              {caseStudiesLink.TextToDisplay}
            </Link>
          </p>
        )}
        &nbsp;
      </div>

      {quote && (
        <section className="figure-block">
          <figure className="page-container">
            <blockquote className="format">
              {homePageProps.PullQuote.quote}
            </blockquote>
            <figcaption>
              {homePageProps.PullQuote.Attribution &&
                homePageProps.PullQuote.Attribution}
            </figcaption>
          </figure>
        </section>
      )}

      <div className="page-container">
        {BenefitsAndOpportunities && (
          <InjectHtml
            paragraphText={BenefitsAndOpportunities}
            sectionClassName="format list-items-boxed benefits"
          />
        )}

        {homePageProps.CommunityStatsBox &&
          homePageProps.CommunityStatsBox.title && (
            <Who {...homePageProps.CommunityStatsBox} />
          )}

        {benefitsSection && benefitsSection.title && (
          <Title title={benefitsSection.title} />
        )}
        {benefitsSection &&
          benefitsSection.introParagraph &&
          benefitsSection.benefits && <p>{benefitsSection.introParagraph}</p>}
        {benefitsSection && benefitsSection.benefits && (
          <div id={`${benefitsSection.id}_title`} className="cardgrid">
            <CardList
              key={benefitsSection.id}
              bodyText={benefitsSection.benefits.benefitText}
              paragraphTextList={benefitsSection.benefits}
              contentImage={benefitsSection.benefits.icon}
            />
          </div>
        )}
        <hr />
        {readNextLinks && (
          <div>
            <ul className="listnostyle readlinkscard">
              {readNextLinks.map((next, index) => {
                return (
                  <ReadNextItem
                    key={index}
                    linkItem={next}
                    styleName="listnostyle readlinksitem"
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

HomePage.propTypes = {
  links: PropTypes.array,
};

export default HomePage;
