# Full Stack Developer Challenge

## Steps
Within the root directory, there are 2 directories `server/` and `frontend/`. Run `npm install` in both.
On `server/`, run `node app.js`. This will start our server, and start listening at `http://localhost:4000`.
Then, on `frontend/` run `npm start`. This will create an instance of the app. I should open a tab, but in case it doesn't, navigate to `http://localhost:3000`.

At first, there's only one user: `admin`, with the safest password there is: `1234`.
After logging in as an admin, the default view is the CRUD of users and a tab to go to reviews CRUD.
You can add new users, and then create reviews for them, and assign said reviews to other employees.

When logging in as an employee, the only view is the list of feedback requested, and by clicking on the elements of the list, we can complete the review and send it.

Since I'm not using a database to persist the info, all employees and reviews will exist while the server is still running. Once it's down, and up again, we are back
to having just the admin.

## Assumptions
* It's for medium and large devices. Altough it's usable in small devices, some visual defects are expected.
* `admin` doesn't review. It's just an administrative user that handles the list of employees and requests feedback.
* You can request feedback for the same employee multiple times, but you can't ask more than once to the same reviewer feedback about the same employee.
* The last one changes once the feedback is sent. (You can't have pending multiple instaces of the same Reviewee-Reviewer)
* The details of the feedback were completely arbitrarily chosen by me.

