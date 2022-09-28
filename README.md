### Project description

Mobispace is a simple marketplace platform for mobile devices where users can register/login, post marketplace ads, browse mobile devices, edit their profile, etc. The backend is a persisent PostgreSQL database (AWS-RDS), hosted from [this] (<https://github.com/EmilAvramov/angular-defense-server>) repository.

The home page is different depending on whether the user is authenticated or not. Registered/logged in users get additional functionality in the form of creating marketplace ads, editing their settings and deleting ads, while guests can still browse devices and ads.

### Project purpose and requirements

This is a mock project for Softuni's Angular 2022 Course. The main project requirements are:

- Create a live, functional website using Angular
- Implement user authentication
- Have dynamic pages, based on authentication (guest/user)
- Communicate to a remote service, technology of your choice
- Have at least one catalog and details section
- Demonstrate familiarity with Angular
- Use client-side rendering (SPA)
- Use a source-control system
- Apply error handling and data validation
- Good UI/UX and good usability

### Technologies used

- Front-end - Javascript (Typescript), SASS
- Back-end - [Details] (<https://github.com/EmilAvramov/angular-defense-server>)
- Hosting - Hosted via AWS Codebuild and S3 Bucket [here] (<http://s3-angular-client.s3-website-eu-west-1.amazonaws.com/>)
- Frameworks/Libraries
  - Angular
  - NgRx
  - RxJS
  - ngx-spinner
  - material-dialog
  - reactive-forms
  - Jasmine (testing)

### Setup

To run the project locally, you will need the back-end located [here] (<https://github.com/EmilAvramov/angular-defense-server>) and run that one locally as well in parallel. NodeJS is necessary. Steps to follow:

- Install NodeJS (v16+)
- Run ```npm i -D @angular/cli@14.1.2```
- Run ```npm i```
- Run ```ng s```
- Client should now be available at localhost:4200

To run the project in the cloud, one of the options is to create a free AWS account, build a pipeline to this repository and codebuild the pipeline into a S3 bucket (which offers free hosting and a free domain). If you want to run the client locally to a server in the cloud, change the address in src/app/shared/variable/config.ts to point to the server. Additionally, double-check the buidlspec.yaml in the root dir for necessary changes.

### NgRx Store Specifics

The store holds 4 different states, depending on the data type (user, device, posting or misc). Dispatching of the events is done through the facades in each store/state. 'readonly' methods are observables which can be used, which the other methods trigger different state changes depending on the operation.

### Architecture

- To be added later
