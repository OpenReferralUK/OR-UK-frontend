import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Numbers from './badge/'
import SideMenu from "../sidemenu/";
import useOukapi from '../../helpers/dataFetch';
import CardList from './Cards/CardList';
import Title from '../shared/title';
import LinkWithTitleSection from "./LinkWithTitleSection";
import BackButton from '../genericcontentpage/BackButton';

//build a picture
const WhoIsUsing = ({ parent }) => {

    //use styles prop

    const getObjects = (orgSections) => {

        let titles = orgSections.filter(org => org.title);

        return titles.map(title => {
            return title.title
        });
    }

    const getGroups = (orgSections) => {

        let orgTitles = orgSections.filter(org => org.title);
        return orgTitles;

    }

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const REACT_APP_WHO_IS_USING_PAGE = process.env.REACT_APP_WHO_IS_USING_PAGE;

    const [{ data, isError }, isFetching] = useOukapi(`${BASE_URL}${REACT_APP_WHO_IS_USING_PAGE}`);
    const {
        pageTitle,
        numbers,
        id,
        orgSections,
        caseStudiesLink,
        underNumbersText,
        registerLink,
        registerLinkWithTitle
    } = data

    //need id make sure all keys set
    console.log(id);

    if (isFetching || isError)
        return null;

    return (
        <main id="content" className="main-container">
            <div className="page-container flex-container">
                <SideMenu subMenu={getObjects(orgSections)} />
                <article className="flex-right">                    
                    <BackButton parent={parent} />

                    <h1>{pageTitle}</h1>

                    <Numbers numbers={numbers} />
                    <p>{underNumbersText}</p>

                    <a href={registerLink.url} className="button button-primary">
                        {registerLink.TextToDisplay}
                    </a>

                    <p>
                        <Link to={caseStudiesLink.url} >{caseStudiesLink.TextToDisplay}</Link>
                    </p>

                    {orgSections && getGroups(orgSections).map((organisation, index) => {
                        return <Fragment key={`${organisation.id}grouptitle}`}>
                            <Title title={organisation.title} id={`section-${index + 1}-heading`} />
                            <ul id={`${organisation.id}_title`} className="cardgrid">
                                <CardList key={organisation.id} organisationList={organisation.Organisation} type="org" />
                            </ul>
                        </Fragment>
                    })}

                    <LinkWithTitleSection {...registerLinkWithTitle} />

                </article>

            </div>

        </main>
    )

}
export default WhoIsUsing;

