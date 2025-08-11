<!-- # 🧾 Backend Form Validation & Error Handling Notes

## 📌 Form Validations

When we enter data in a form, the browser and/or the backend script will check to see that the data is in the correct format and within the constraints set by the application.


✅ 1. Introduction to Form Validation

Form validation ensures that the user inputs correct and expected data into forms. It helps prevent faulty or malicious input from being processed by the server.

➤ Types of Validation:

Client-side validation: Done in the browser using HTML5 or JavaScript.
- `required` will be added to form fields  
- `class` is added in the form  
- Validation JS is placed in `public/javascript/` folder  
- Link JS file inside the HTML/Boilerplate

Server-side validation: Done on the backend using schema libraries or manual checks.
---
✅ 2. Client-side Form Validation (Frontend)

Add required attribute in form fields.

Use classes to style success/error messages.

Validation JS file is stored in: public/javascript/

Link your JS file in the frontend HTML/EJS boilerplate.
💡 Example:

<input type="text" name="title" required>

---

✅ 3. Server-side Form Validation (Backend)

Handled in Express.js with the help of libraries like Joi or manually.

🔧 Why server-side validation?

To avoid manipulation from browser/dev tools.

To ensure data integrity at backend level.

---
✅ 4. Creating a Custom Error Class (ExpressError)

Helps in sending custom status codes and messages.

📁 File: utils/ExpressError.js

class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = ExpressError;

---
✅ 5. Async Error Handler: wrapAsync

Avoids repeated try-catch blocks in async route handlers.

📁 File: utils/wrapAsync.js

module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
`` -->