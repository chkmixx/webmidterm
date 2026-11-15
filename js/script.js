$(document).ready(function () {

    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        $("body").addClass("dark-mode");
        $("#themeToggle").text("☀️");
    } else {
        $("body").removeClass("dark-mode");
        $("#themeToggle").text("🌙");
    }


    $("#themeToggle").on("click", function () {

        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {

            localStorage.setItem("theme", "dark");
            $(this).text("☀️");

        } else {

            localStorage.setItem("theme", "light");
            $(this).text("🌙");

        }

    });


    function validateName() {

        let name = $("#name").val().trim();

        if (name === "") {

            $("#nameError").text("Name is required.");
            return false;

        }

        if (name.length < 2) {

            $("#nameError").text(
                "Name must contain at least 2 characters."
            );

            return false;

        }

        $("#nameError").text("");

        return true;
    }


    function validateEmail() {

        let email = $("#email").val().trim();

        let emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            $("#emailError").text(
                "Email is required."
            );

            return false;
        }

        if (!emailRegex.test(email)) {

            $("#emailError").text(
                "Enter a valid email address."
            );

            return false;
        }

        $("#emailError").text("");

        return true;
    }


    function validateMessage() {

        let message = $("#message").val().trim();

        if (message === "") {

            $("#messageError").text(
                "Message is required."
            );

            return false;
        }

        if (message.length < 5) {

            $("#messageError").text(
                "Message must contain at least 5 characters."
            );

            return false;
        }

        $("#messageError").text("");

        return true;
    }


    function validatePassword() {

        let password = $("#password").val();

        if (password === "") {

            $("#passwordStrength").text("");

            $("#passwordError").text(
                "Password is required."
            );

            return false;
        }

        if (password.length < 6) {

            $("#passwordStrength").text(
                "Weak password"
            );

            $("#passwordError").text(
                "Password must contain at least 6 characters."
            );

            return false;
        }

        if (password.length < 10) {

            $("#passwordStrength").text(
                "Medium password"
            );

            $("#passwordError").text("");

        } else {

            $("#passwordStrength").text(
                "Strong password"
            );

            $("#passwordError").text("");

        }

        if ($("#confirmPassword").val() !== "") {
            validateConfirmPassword();
        }

        return true;
    }


    function validateConfirmPassword() {

        let password = $("#password").val();

        let confirmPassword =
            $("#confirmPassword").val();

        if (confirmPassword === "") {

            $("#confirmPasswordError").text(
                "Please confirm your password."
            );

            return false;
        }

        if (password !== confirmPassword) {

            $("#confirmPasswordError").text(
                "Passwords do not match."
            );

            return false;
        }

        $("#confirmPasswordError").text("");

        return true;
    }


    $("#name").on(
        "input blur",
        validateName
    );

    $("#email").on(
        "input blur",
        validateEmail
    );

    $("#message").on(
        "input blur",
        validateMessage
    );

    $("#password").on(
        "input blur",
        validatePassword
    );

    $("#confirmPassword").on(
        "input blur",
        validateConfirmPassword
    );


    $("#registrationForm").on("submit", function (e) {

        e.preventDefault();

        let nameValid = validateName();
        let emailValid = validateEmail();
        let messageValid = validateMessage();
        let passwordValid = validatePassword();
        let confirmPasswordValid =
            validateConfirmPassword();


        if (
            nameValid &&
            emailValid &&
            messageValid &&
            passwordValid &&
            confirmPasswordValid
        ) {

            localStorage.setItem(
                "registeredEmail",
                $("#email").val().trim()
            );

            localStorage.setItem(
                "registeredName",
                $("#name").val().trim()
            );


            $("#formSuccess").text(
                "Registration successful! You can now sign in."
            );

            $("#registrationForm")[0].reset();

            $("#passwordStrength").text("");

        } else {

            $("#formSuccess").text("");

        }

    });


    function checkSignIn() {

        let isLoggedIn =
            localStorage.getItem("isLoggedIn");

        let userEmail =
            localStorage.getItem("userEmail");


        if (
            isLoggedIn === "true" &&
            userEmail
        ) {

            $("#signInForm").hide();

            $("#signedInUser").show();

            $("#userEmail").text(
                userEmail
            );

        } else {

            $("#signInForm").show();

            $("#signedInUser").hide();

        }

    }


    $("#signInEmail").on(
        "input blur",
        function () {

            let email =
                $(this).val().trim();

            let emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                $("#signInEmailError").text(
                    "Email is required."
                );

            } else if (!emailRegex.test(email)) {

                $("#signInEmailError").text(
                    "Enter a valid email address."
                );

            } else {

                $("#signInEmailError").text("");

            }

        }
    );


    $("#signInPassword").on(
        "input blur",
        function () {

            if ($(this).val() === "") {

                $("#signInPasswordError").text(
                    "Password is required."
                );

            } else {

                $("#signInPasswordError").text("");

            }

        }
    );


    $("#signInForm").on(
        "submit",
        function (e) {

            e.preventDefault();


            let email =
                $("#signInEmail").val().trim();

            let password =
                $("#signInPassword").val();


            let emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            let valid = true;


            if (email === "") {

                $("#signInEmailError").text(
                    "Email is required."
                );

                valid = false;

            } else if (!emailRegex.test(email)) {

                $("#signInEmailError").text(
                    "Enter a valid email address."
                );

                valid = false;

            } else {

                $("#signInEmailError").text("");

            }


            if (password === "") {

                $("#signInPasswordError").text(
                    "Password is required."
                );

                valid = false;

            } else {

                $("#signInPasswordError").text("");

            }


            if (!valid) {
                return;
            }


            let registeredEmail =
                localStorage.getItem(
                    "registeredEmail"
                );


            if (!registeredEmail) {

                $("#signInError").text(
                    "No registered user found. Please register first."
                );

                return;

            }


            if (
                email !== registeredEmail
            ) {

                $("#signInError").text(
                    "Email does not match the registered account."
                );

                return;

            }


            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "userEmail",
                email
            );


            $("#signInError").text("");

            checkSignIn();

        }
    );


    $("#signOutButton").on(
        "click",
        function () {

            localStorage.removeItem(
                "isLoggedIn"
            );

            localStorage.removeItem(
                "userEmail"
            );


            $("#signInForm")[0].reset();

            $("#signInEmailError").text("");

            $("#signInPasswordError").text("");

            $("#signInError").text("");

            checkSignIn();

        }
    );


    checkSignIn();


    let books = [

        {
            id: 1,
            title: "Little Women",
            author: "Louisa May Alcott"
        },

        {
            id: 2,
            title: "The Little Prince",
            author: "Antoine de Saint-Exupéry"
        }

    ];


    function displayBooks() {

        $("#booksBody").empty();


        books.forEach(function (book) {

            let row = `

                <tr>

                    <td>${book.id}</td>

                    <td>${book.title}</td>

                    <td>${book.author}</td>

                    <td>

                        <button
                            type="button"
                            class="btn btn-sm btn-dark edit-book"
                            data-id="${book.id}">
                            Edit
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-danger delete-book"
                            data-id="${book.id}">
                            Delete
                        </button>

                    </td>

                </tr>

            `;


            $("#booksBody").append(row);

        });

    }


    if ($("#booksBody").length) {

        displayBooks();

    }


    $("#bookForm").on(
        "submit",
        function (e) {

            e.preventDefault();


            let title =
                $("#bookTitle").val().trim();

            let author =
                $("#bookAuthor").val().trim();


            if (
                title === "" ||
                author === ""
            ) {

                return;

            }


            let newId =
                books.length > 0
                    ? Math.max(
                        ...books.map(
                            book => book.id
                        )
                    ) + 1
                    : 1;


            books.push({

                id: newId,
                title: title,
                author: author

            });


            displayBooks();

            $("#bookForm")[0].reset();

        }
    );


    $(document).on(
        "click",
        ".delete-book",
        function () {

            let id =
                Number($(this).data("id"));


            books =
                books.filter(function (book) {

                    return book.id !== id;

                });


            displayBooks();

        }
    );


    $(document).on(
        "click",
        ".edit-book",
        function () {

            let id =
                Number($(this).data("id"));


            let book =
                books.find(function (book) {

                    return book.id === id;

                });


            if (!book) {
                return;
            }


            let newTitle =
                prompt(
                    "Enter new book title:",
                    book.title
                );


            if (newTitle === null) {
                return;
            }


            let newAuthor =
                prompt(
                    "Enter new author:",
                    book.author
                );


            if (newAuthor === null) {
                return;
            }


            if (
                newTitle.trim() === "" ||
                newAuthor.trim() === ""
            ) {

                return;

            }


            book.title =
                newTitle.trim();

            book.author =
                newAuthor.trim();


            displayBooks();

        }
    );


    $("#apiSearchButton").on(
        "click",
        function () {

            let query =
                $("#apiSearch").val().trim();


            if (query === "") {

                $("#apiStatus").text(
                    "Please enter a book title."
                );

                $("#apiResults").empty();

                return;

            }


            $("#apiStatus").text(
                "Loading..."
            );

            $("#apiResults").empty();


            fetch(
                "https://openlibrary.org/search.json?title=" +
                encodeURIComponent(query)
            )

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "API request failed."
                    );

                }

                return response.json();

            })

            .then(function (data) {

                $("#apiResults").empty();


                if (
                    !data.docs ||
                    data.docs.length === 0
                ) {

                    $("#apiStatus").text(
                        "No books found."
                    );

                    return;

                }


                $("#apiStatus").text(
                    "Found " +
                    data.numFound +
                    " books."
                );


                data.docs
                    .slice(0, 6)
                    .forEach(function (book) {

                        let title =
                            book.title ||
                            "Unknown title";


                        let author =
                            book.author_name
                                ? book.author_name[0]
                                : "Unknown author";


                        let year =
                            book.first_publish_year ||
                            "Unknown year";


                        let cover =
                            book.cover_i
                                ? "https://covers.openlibrary.org/b/id/" +
                                  book.cover_i +
                                  "-M.jpg"
                                : "";


                        let imageHTML =
                            cover
                                ? `
                                    <img
                                        src="${cover}"
                                        class="img-fluid rounded mb-3"
                                        alt="${title}">
                                  `
                                : "";


                        let card = `

                            <div class="col-12 col-md-6 col-lg-4">

                                <article class="emma-card">

                                    <div class="emma-card-content">

                                        ${imageHTML}

                                        <span class="emma-tag">
                                            Open Library
                                        </span>

                                        <h3>
                                            ${title}
                                        </h3>

                                        <p>
                                            <strong>Author:</strong>
                                            ${author}
                                        </p>

                                        <p>
                                            <strong>First published:</strong>
                                            ${year}
                                        </p>

                                    </div>

                                </article>

                            </div>

                        `;


                        $("#apiResults").append(
                            card
                        );

                    });

            })

            .catch(function (error) {

                console.error(error);


                $("#apiStatus").text(
                    "Unable to load books. Please try again later."
                );


                $("#apiResults").empty();

            });

        }
    );


    $("#apiSearch").on(
        "keypress",
        function (e) {

            if (e.key === "Enter") {

                $("#apiSearchButton").click();

            }

        }
    );

});
