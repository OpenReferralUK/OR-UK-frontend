import { useState, useEffect } from 'react';
import useOukapi from '../../helpers/dataFetch';
import HtmlSection from '../htmlsection';
import SideMenu from '../sidemenu';
import { Link } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const GenericContentPage = ({ cmsLocation }) => {
  const [{ data, isError }] = useOukapi(new URL(cmsLocation, BASE_URL).href);
  const [page, setPage] = useState(null);

  const [sectionHeadings, setSectionHeadings] = useState([]);

  useEffect(() => {
    if (data[0]) {
      setPage(data[0].page)
    };

    if (page) {
      setSectionHeadings(page.sections.map(section => section.sectionHeading));
    }

  }, [page, data]);

  if (isError || !data[0] || !page) return <h1>404 - content not found!</h1>;

  let readNextLink = <></>
  if (page.ReadNextLink) {
    readNextLink = (<><hr />
      <Link to={page.ReadNextLink.url}>
        {page.ReadNextLink.TextToDisplay}
      </Link></>)
  }

  return (
    <main className="main">
      <div className="flexcontainer">
        <SideMenu subMenu={sectionHeadings} />
        <article className="flexright">
          <h1>{page.title}</h1>
          <HtmlSection sections={page.sections} />
          {readNextLink}
        </article>
      </div>
    </main>
  )
}

export default GenericContentPage;