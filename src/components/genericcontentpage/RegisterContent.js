import { covertHeadingToIdentifier, HtmlSection } from '../htmlsection';
import { useState } from 'react';
import GenericContent from './GenericContent';
import InjectHtml from '../home/InjectHtml';
import 'formdata-polyfill';

const apiUrl = 'https://validator.openreferraluk.org/api';

const onSubmitSetResponse = (e, setResponse) => {
    e.preventDefault();

    const form = e.target;
    const data = new URLSearchParams(new FormData(form));

    fetch(form.action, {
        method: form.method,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data
    })
        .then(async response => setResponse(await response.json()))
        .catch(error => {
            console.log(error);
            setResponse({ success: false });
        });
};

const ResponseMessage = ({ response }) => {
    const { success, error, errors } = response;

    if (success !== true && success !== false)
        return null;

    if (success)
        return <div className="alert alert-success mt-1rem" aria-live="polite">Registered successfully</div>;

    if (errors)
        return <div className="alert alert-danger mt-1rem" aria-live="polite">{errors.map(error => <div>{error.message}</div>)}</div>;

    if (error)
        return <div className="alert alert-danger mt-1rem" aria-live="polite">{error}</div>;
        
    return <div className="alert alert-danger mt-1rem" aria-live="polite">Registration unsuccessful</div>;
};

const FieldClassName = (field, response) => {
    const { errors = [] } = response;
    return `${errors.filter(error => error.field === field).length > 0 ? 'error': ''}`;
};

const KeepInformedSection = ({ section, index }) => {
    //const [response, setResponse] = useState({});
    //const onSubmit = e => onSubmitSetResponse(e, setResponse);

    return <HtmlSection key={section.id} index={index} section={section}>
        <div className="mt-1rem">
            <a href="https://openreferraluk.us1.list-manage.com/subscribe?u=9cdac16b200ed03ca1159653a&id=00056900bd" className="button button-primary">
                Subscribe to the Open Referral UK mailing list
            </a>
        </div>
        {/* <form className="form-section" action={`${apiUrl}/registerUser`} method="post" onSubmit={onSubmit}>
            <h3>Sign up to our news letter</h3>
            <label className="required">Email address</label>
            <div className="input-with-button">
                <input type="email" id="email-address" name="email_address" className={FieldClassName('email_address', response)} required />
                <button type="submit" className="button button-primary">Subscribe</button>
            </div>
            <ResponseMessage response={response} />
        </form> */}
    </HtmlSection>;
};

const RegisterYourOrganisation = ({ section, index }) => {    
    const [response, setResponse] = useState({});
    const onSubmit = e => onSubmitSetResponse(e, setResponse);
    
    return <form className="form-section" action={`${apiUrl}/registerOrganisation`} method="post" onSubmit={onSubmit}>
        <h3>{section.sectionHeading}</h3>
        <InjectHtml itemKey={`${index}body`} paragraphText={section.sectionBody} />

        <div className="form-item">
            <label htmlFor="organisation-name" className="required">Organisation name</label>
            <input type="text" id="organisation-name" name="organisation_name" className={FieldClassName('organisation_name', response)} required />
        </div>

        <div className="form-item">
            <label htmlFor="organisation-type" className="required">Organisation type</label>
            <input type="text" id="organisation-type" name="organisation_type" list="organisation-types" className={FieldClassName('organisation_type', response)} required />
            <datalist id="organisation-types">
                <option value="Commissioning a directory of services" />
                <option value="Supplying directory software and API" />
                <option value="Consuming an Open Referral UK compliant API" />
                <option value="Maintaining service data" />
            </datalist>
        </div>

        <div className="form-item">
            <label className="required">Organisation adoption stage</label>
            <div className={`check-list ${FieldClassName('adoptation_stage', response)}`}>
                <div className="check-item">
                    <input type="radio" id="adoption-considering" name="adoptation_stage" value="Considering" /> <label htmlFor="adoption-considering">Considering</label>
                </div>
                <div className="check-item">
                    <input type="radio" id="adoption-adopting" name="adoptation_stage" value="Adopting" /> <label htmlFor="adoption-adopting">Adopting</label>
                </div>
                <div className="check-item">
                    <input type="radio" id="adoption-adopted" name="adoptation_stage" value="Adopted" /> <label htmlFor="adoption-adopted">Adopted</label>
                </div>
            </div>
        </div>

        <div className="form-item">
            <label htmlFor="url">
                Web link URL (optional)
                <small>Provide a link for people to read about your adoption or organisation.</small>
            </label>
            <input type="text" id="url" name="url" />
        </div>

        <div className="form-item">
            <label htmlFor="private-email-address">
                <span className="required">Private email address</span>
                <small>So that we can follow-up with you to verify your organisation. Will not be shared.</small>
            </label>
            <input type="email" id="private-email-address" name="private_email_address" className={FieldClassName('private_email_address', response)} required />
        </div>

        <div className="form-item">
            <label htmlFor="public-email-address">
                Public email address (optional)
                <small>Will be shared alongside your organisation on our Who's using page.</small>
            </label>
            <input type="email" id="public-email-address" name="public_email_address" />
        </div>

        <div className="form-item">
            <br />
            <button type="submit" className="button button-primary">Register organisation</button>
        </div>
        
        <ResponseMessage response={response} />
    </form>;
};

const RegisterSections = ({ sections }) => sections.map((section, index) => {
    const identifier = covertHeadingToIdentifier(section.sectionHeading);

    if (identifier === `keep-informed`)
        return <KeepInformedSection key={section.id} index={index} section={section} />;

    if (identifier === `register-your-organisation`)
        return <RegisterYourOrganisation key={section.id} index={index} section={section} />;

    return <HtmlSection key={section.id} index={index} section={section} />;
});

const RegisterContent = (props) => <GenericContent {...props} showDescription={false} Sections={RegisterSections} />;

export default RegisterContent;