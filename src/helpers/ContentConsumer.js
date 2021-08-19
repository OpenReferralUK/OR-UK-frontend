//lets refactor this we can look at together but I have made this env var change because the url is likely to change
const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://admin.beta.openreferraluk.org';
const LANDING_PAGE_URI = '/home-page';
const MENU_URI = '/top-menus';
const SUB_MENU_URI = '/sub-menus/';

//const BASE_URL  = process.env.REACT_APP_BASE_URL;
//const LANDING_PAGE_URI = process.env.REACT_APP_HOME_PAGE_URI;
//const MENU_URI = process.env.;


export const fetchLandingPageContent = () => {
  //consider using nlogge

  return fetch(BASE_URL + LANDING_PAGE_URI)
    .then(async res => {
      if (res.status === 200) {
        return await res.json();
      } else {
        console.log("An exception occurred within the application, please contact the administrator.");
      }
    }).catch(err => console.log("An exception occurred within the application, please contact the administrator."));
}

export const fetchMainMenuItems = () => {
  return fetch(BASE_URL + MENU_URI)
    .then(async res => {

      if (res.status === 200) {
        return await res.json();
      } else {
        console.log("An exception occurred within the application, please contact the administrator.");
      }

    })
}

export const fetchSubMenuItems = subMenuId => {
  return fetch(BASE_URL + SUB_MENU_URI + subMenuId)
    .then(res => res.json()).catch(err => { throw new Error("Network time out") });
}