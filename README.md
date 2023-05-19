# Release procedure

openreferraluk.org

This is a static website with files in s3, with cloudfront infront of that.

s3 urls are (both under the default aws account):
live: https://s3.console.aws.amazon.com/s3/buckets/openreferraluk.org?region=eu-west-1&tab=objects
beta: https://s3.console.aws.amazon.com/s3/buckets/beta.openreferraluk.org?region=eu-west-1&tab=objects

(I think it should be possible to use something like winscp to access these files)

cloudfront urls are:
live: https://console.aws.amazon.com/cloudfront/home?region=eu-west-1#distribution-settings:E3BY8BZ5S0INQ8
beta: https://console.aws.amazon.com/cloudfront/home?region=eu-west-1#distribution-settings:E3HQWFOMPGY71A


To release:

git pull
npm i
npm run build

static build files will output to \build

copy those over the s3 bucket
(each time we build, the js and css files have a different name. On beta we currently have a growing list of js files that could be deleted. The most important file that gets overwritten is the index.html which references those js/css files.)

to clear the cache,
go to the cloudfront
invalidations tab
copy an existing invalidation (you only need to invalidate /index.html)
invalidate

invalidations cost money, and amazon recomend doing it otherways. I haven't really understood those otherways.

# orukcms service

A service called orukcms is required for the cms (strapi?) to work

The domain is currentlly https://admin.beta.openreferraluk.org

This points to the openref-test target group, which points to a linux server.

Despite being called "beta" and "test" they are both used by live.

To restart the server (should it go down):
sudo service orukcms restart

# strapi api

The strapi api is at: https://admin.beta.openreferraluk.org/admin/auth/login

Requires the orukcms service to be running (above)

#  Open Referral UK
The Open Referral UK data standard is a consistent way of recording and sharing information about services. 

Currently in the UK most organisations in the public sector (such as local authorities and health, housing and voluntary organisations) have a form of directory that is used to store and list local services. In each locality, directory content is often duplicated across the public sector. 

Open Referral UK defines a standard structure to meet this need for a consistent way of gathering and using data.

Visit Open referral uk @ https://openreferraluk.org/

## 'Dashboard' page
The route `/dashboard` renders the [data feed dashboard](https://openreferraluk.org/dashboard). This page pulls data from the [service validator API](https://validator.openreferraluk.org/api), which will block all requests other than those coming from the following domains:
```
"http://dev.openreferraluk.org",
"https://dev.openreferraluk.org",
"http://beta.openreferraluk.org",
"https://beta.openreferraluk.org",
"http://openreferraluk.org",
"https://openreferraluk.org",
"https://validator.openreferraluk.org",
"https://exporter.openreferraluk.org",
"https://tools.openreferraluk.org"
``` 

In order to get around CORS issues when accessing this page locally, there are two solutions suggested by Matt from Porism (thanks!):
1. Access a static copy of the JSON at the route `/devdashboard`
2. Point one of the above addresses (likely: `http://dev.openreferraluk.org`) to your local build in your dev environment.

# Setting up

# Creating your production build for the server
Update the configuration file for the client virtual host
    Set the DocumentRoot and the Directory
    Enable the configuration if not already enabled
    yarn build
    Copy contents of build to document root specified in the virtual host configuration ....




### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
