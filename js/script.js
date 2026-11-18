$(document).ready(function () {
 function applyTheme() {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            $("body").addClass("dark-mode");
            $("#themeToggle").text("☀️");

        } else {

            $("body").removeClass("dark-mode");
            $("#themeToggle").text("🌙");

        }
    }

    applyTheme();

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

        const name = $("#name").val().trim();

        if (name === "") {

            $("#nameError").text("Name is required.");
            return false;

        }

        $("#nameError").text("");
        return true;
    }


    function validateEmail() {

        const email = $("#email").val().trim();

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (email === "") {

            $("#emailError").text("Email is required.");
            return false;

        }

        if (!emailRegex.test(email)) {

            $("#emailError").text("Enter a valid email.");
            return false;

        }

        $("#emailError").text("");
        return true;
    }


    function validateMessage() {

        const message = $("#message").val().trim();

        if (message === "") {

            $("#messageError").text("Message is required.");
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

        const password = $("#password").val();

        if (password === "") {

            $("#passwordStrength").text("");
            $("#passwordError").text("Password is required.");

            return false;
        }

        if (password.length < 6) {

            $("#passwordStrength").text("Weak password");
            $("#passwordError").text(
                "Password must contain at least 6 characters."
            );

            return false;
        }

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {

            $("#passwordStrength").text("Strong password");

        } else {

            $("#passwordStrength").text("Medium password");

        }

        $("#passwordError").text("");

        return true;
    }


    function validateConfirmPassword() {

        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

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


    $("#name").on("input blur", validateName);
    $("#email").on("input blur", validateEmail);
    $("#message").on("input blur", validateMessage);
    $("#password").on("input blur", validatePassword);
    $("#confirmPassword").on(
        "input blur",
        validateConfirmPassword
    );


    $("#registrationForm").on("submit", function (event) {

        event.preventDefault();

        const validName = validateName();
        const validEmail = validateEmail();
        const validMessage = validateMessage();
        const validPassword = validatePassword();
        const validConfirmPassword =
            validateConfirmPassword();

        if (
            validName &&
            validEmail &&
            validMessage &&
            validPassword &&
            validConfirmPassword
        ) {

            localStorage.setItem(
                "registeredEmail",
                $("#email").val().trim()
            );

            localStorage.setItem(
                "registeredName",
                $("#name").val().trim()
            );

            localStorage.setItem(
                "registeredPassword",
                $("#password").val()
            );

            $("#formSuccess").text(
                "Registration successful!"
            );

            $("#registrationForm")[0].reset();

            $("#passwordStrength").text("");
        }

    });

    function checkSignIn() {

        const isLoggedIn =
            localStorage.getItem("isLoggedIn");

        const userEmail =
            localStorage.getItem("userEmail");

        if (
            isLoggedIn === "true" &&
            userEmail
        ) {

            $("#signInForm").hide();
            $("#signedInUser").show();

            $("#userEmail").text(userEmail);

        } else {

            $("#signInForm").show();
            $("#signedInUser").hide();

        }
    }


    $("#signInForm").on("submit", function (event) {

        event.preventDefault();

        const email =
            $("#signInEmail").val().trim();

        const password =
            $("#signInPassword").val();

        const registeredEmail =
            localStorage.getItem("registeredEmail");

        const registeredPassword =
            localStorage.getItem("registeredPassword");

        $("#signInEmailError").text("");
        $("#signInPasswordError").text("");
        $("#signInError").text("");

        let valid = true;

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (email === "") {

            $("#signInEmailError").text(
                "Email is required."
            );

            valid = false;

        } else if (!emailRegex.test(email)) {

            $("#signInEmailError").text(
                "Enter a valid email."
            );

            valid = false;
        }


        if (password === "") {

            $("#signInPasswordError").text(
                "Password is required."
            );

            valid = false;
        }


        if (!valid) {
            return;
        }


        if (
            registeredEmail &&
            email !== registeredEmail
        ) {

            $("#signInError").text(
                "This email is not registered."
            );

            return;
        }


        if (
            registeredPassword &&
            password !== registeredPassword
        ) {

            $("#signInError").text(
                "Incorrect password."
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

        checkSignIn();

    });


    $("#signOutButton").on("click", function () {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");

        checkSignIn();

    });


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

            $("#booksBody").append(`

                <tr>

                    <td>${book.id}</td>

                    <td>${book.title}</td>

                    <td>${book.author}</td>

                    <td>

                        <button
                            class="btn btn-sm btn-warning edit-book"
                            data-id="${book.id}">
                            Edit
                        </button>

                        <button
                            class="btn btn-sm btn-danger delete-book"
                            data-id="${book.id}">
                            Delete
                        </button>

                    </td>

                </tr>

            `);

        });

    }


    displayBooks();


    $("#bookForm").on("submit", function (event) {

        event.preventDefault();

        const title =
            $("#bookTitle").val().trim();

        const author =
            $("#bookAuthor").val().trim();

        if (
            title === "" ||
            author === ""
        ) {

            return;
        }


        const newId =
            books.length > 0
                ? Math.max(
                    ...books.map(book => book.id)
                ) + 1
                : 1;


        books.push({

            id: newId,
            title: title,
            author: author

        });


        displayBooks();

        $("#bookForm")[0].reset();

    });


  $(document).on("click", ".delete-book", function () {

    const id = Number($(this).data("id"));

    books = books.filter(function (book) {
        return book.id !== id;
    });

    displayBooks();

});


    $(document).on(
        "click",
        ".edit-book",
        function () {

            const id =
                Number($(this).data("id"));

            const book =
                books.find(function (book) {

                    return book.id === id;

                });


            if (!book) {
                return;
            }


            const newTitle =
                prompt(
                    "Enter new book title:",
                    book.title
                );


            if (newTitle === null) {
                return;
            }


            const newAuthor =
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
    function searchBooks() {

        const query =
            $("#apiSearch").val().trim();

        if (query === "") {

            $("#apiStatus").text(
                "Please enter a book title."
            );

            $("#apiResults").empty();

            return;
        }


        $("#apiStatus").text(
            "Searching..."
        );

        $("#apiResults").empty();


        fetch(
            "https://openlibrary.org/search.json?title=" +
            encodeURIComponent(query)
        )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "API request failed"
                );

            }

            return response.json();

        })

        .then(function (data) {

            const results =
                data.docs.slice(0, 6);


            if (results.length === 0) {

                $("#apiStatus").text(
                    "No books found."
                );

                return;
            }


            $("#apiStatus").text(
                "Found " +
                data.numFound +
                " books. Showing " +
                results.length +
                " results."
            );


            results.forEach(function (book) {

                const title =
                    book.title ||
                    "Unknown title";

                const author =
                    book.author_name
                        ? book.author_name[0]
                        : "Unknown author";

                const year =
                    book.first_publish_year ||
                    "Unknown year";

                const cover =
                    book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "";


                $("#apiResults").append(`

                    <div class="col-md-4 mb-4">

                        <div class="card h-100 shadow-sm">

                            ${
                                cover
                                    ? `
                                    <img
                                        src="${cover}"
                                        class="card-img-top"
                                        alt="${title}"
                                        style="height:300px; object-fit:cover;">
                                    `
                                    : ""
                            }

                            <div class="card-body">

                                <h5 class="card-title">
                                    ${title}
                                </h5>

                                <p class="card-text">

                                    <strong>
                                        Author:
                                    </strong>

                                    ${author}

                                    <br>

                                    <strong>
                                        First published:
                                    </strong>

                                    ${year}

                                </p>

                            </div>

                        </div>

                    </div>

                `);

            });

        })

        .catch(function (error) {

            console.error(error);

            $("#apiStatus").text(
                "Sorry, something went wrong while loading books."
            );

            $("#apiResults").empty();

        });

    }


    $("#apiSearchButton").on(
        "click",
        searchBooks
    );


    $("#apiSearch").on(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchBooks();

            }

        }
    );

    function filterPosts() {

        const searchText =
            $("#searchInput").val().toLowerCase().trim();

        const activeCategory =
            $(".category-btn.active")
                .data("category");

        $(".filter-item").each(function () {

            const item =
                $(this);

            const text =
                item.text().toLowerCase();

            const category =
                item.data("category");

            const matchesSearch =
                text.includes(searchText);

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                item.show();

            } else {

                item.hide();

            }

        });

    }


    $("#searchInput").on(
        "input",
        filterPosts
    );


    $(".category-btn").on(
        "click",
        function () {

            $(".category-btn")
                .removeClass("active");

            $(this)
                .addClass("active");

            filterPosts();

        }
    );
    $(".faq-question").on(
        "click",
        function () {

            const answer =
                $(this).next(".faq-answer");

            answer.slideToggle(300);


            const icon =
                $(this).find(".faq-icon");


            if (icon.text() === "+") {

                icon.text("−");

            } else {

                icon.text("+");

            }

        }
    );
    let currentImageIndex = 0;

    const galleryImages =
        $(".gallery-image");


    $(".gallery-image").on(
        "click",
        function () {

            currentImageIndex =
                galleryImages.index(this);


            $("#lightboxImage")
                .attr(
                    "src",
                    $(this).attr("src")
                );


            $("#lightbox")
                .css("display", "flex")
                .hide()
                .fadeIn(300);

        }
    );


    $("#closeLightbox").on(
        "click",
        function () {

            $("#lightbox")
                .fadeOut(300);

        }
    );


    $("#prevImage").on(
        "click",
        function () {

            currentImageIndex--;


            if (
                currentImageIndex < 0
            ) {

                currentImageIndex =
                    galleryImages.length - 1;

            }


            $("#lightboxImage")
                .fadeOut(
                    150,
                    function () {

                        $(this)
                            .attr(
                                "src",
                                galleryImages
                                    .eq(
                                        currentImageIndex
                                    )
                                    .attr("src")
                            )
                            .fadeIn(150);

                    }
                );

        }
    );


    $("#nextImage").on(
        "click",
        function () {

            currentImageIndex++;


            if (
                currentImageIndex >=
                galleryImages.length
            ) {

                currentImageIndex = 0;

            }


            $("#lightboxImage")
                .fadeOut(
                    150,
                    function () {

                        $(this)
                            .attr(
                                "src",
                                galleryImages
                                    .eq(
                                        currentImageIndex
                                    )
                                    .attr("src")
                            )
                            .fadeIn(150);

                    }
                );

        }
    );
    $(document).on(
        "keydown",
        function (event) {

            if (
                $("#lightbox").is(":visible")
            ) {

                if (
                    event.key === "ArrowLeft"
                ) {

                    $("#prevImage").click();

                }

                if (
                    event.key === "ArrowRight"
                ) {

                    $("#nextImage").click();

                }

                if (
                    event.key === "Escape"
                ) {

                    $("#closeLightbox").click();

                }

            }

        }
    );

});
