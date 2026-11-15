$(document).ready(function () {

    /* =========================
       THEME TOGGLE
    ========================= */

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


    /* =========================
       REGISTRATION VALIDATION
    ========================= */

    $("#registrationForm").on("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        $(".error-message").remove();

        if (name === "") {
            $("#name").after(
                '<small class="error-message text-danger">Name is required</small>'
            );
            valid = false;
        }

        if (email === "") {
            $("#email").after(
                '<small class="error-message text-danger">Email is required</small>'
            );
            valid = false;
        } else if (!emailRegex.test(email)) {
            $("#email").after(
                '<small class="error-message text-danger">Enter a valid email</small>'
            );
            valid = false;
        }

        if (password === "") {
            $("#password").after(
                '<small class="error-message text-danger">Password is required</small>'
            );
            valid = false;
        } else if (password.length < 8) {
            $("#password").after(
                '<small class="error-message text-danger">Password must be at least 8 characters</small>'
            );
            valid = false;
        }

        if (confirmPassword === "") {
            $("#confirmPassword").after(
                '<small class="error-message text-danger">Please confirm your password</small>'
            );
            valid = false;
        } else if (password !== confirmPassword) {
            $("#confirmPassword").after(
                '<small class="error-message text-danger">Passwords do not match</small>'
            );
            valid = false;
        }

        if (valid) {
            localStorage.setItem("registeredName", name);
            localStorage.setItem("registeredEmail", email);
            localStorage.setItem("registeredPassword", password);

            $("#registrationForm")[0].reset();

            alert("Registration successful!");
        }
    });


    /* =========================
       REAL-TIME PASSWORD CHECK
    ========================= */

    $("#password").on("input", function () {
        const password = $(this).val();

        let strength = "";
        let color = "";

        if (password.length === 0) {
            strength = "";
        } else if (password.length < 6) {
            strength = "Weak password";
            color = "text-danger";
        } else if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            strength = "Strong password";
            color = "text-success";
        } else {
            strength = "Medium password";
            color = "text-warning";
        }

        $("#passwordStrength")
            .removeClass("text-danger text-warning text-success")
            .addClass(color)
            .text(strength);
    });


    /* =========================
       REAL-TIME EMAIL CHECK
    ========================= */

    $("#email").on("input", function () {
        const email = $(this).val().trim();

        const emailRegex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (email === "") {
            $(this).removeClass("is-valid is-invalid");
        } else if (emailRegex.test(email)) {
            $(this)
                .removeClass("is-invalid")
                .addClass("is-valid");
        } else {
            $(this)
                .removeClass("is-valid")
                .addClass("is-invalid");
        }
    });


    /* =========================
       PASSWORD CONFIRMATION
    ========================= */

    $("#confirmPassword").on("input", function () {
        const password = $("#password").val();
        const confirmPassword = $(this).val();

        if (confirmPassword === "") {
            $(this).removeClass("is-valid is-invalid");
        } else if (password === confirmPassword) {
            $(this)
                .removeClass("is-invalid")
                .addClass("is-valid");
        } else {
            $(this)
                .removeClass("is-valid")
                .addClass("is-invalid");
        }
    });


    /* =========================
       SIGN IN
    ========================= */

    $("#signInForm").on("submit", function (e) {
        e.preventDefault();

        const email = $("#signInEmail").val().trim();
        const password = $("#signInPassword").val();

        const savedEmail = localStorage.getItem("registeredEmail");
        const savedPassword = localStorage.getItem("registeredPassword");
        const savedName = localStorage.getItem("registeredName");

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (email === savedEmail && password === savedPassword) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedInName", savedName || "User");

            alert("Sign in successful!");

            updateLoginInterface();
        } else {
            alert("Incorrect email or password.");
        }
    });


    /* =========================
       LOGIN INTERFACE
    ========================= */

    function updateLoginInterface() {
        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true";

        if (isLoggedIn) {
            const name =
                localStorage.getItem("loggedInName") || "User";

            $("#loginStatus").text("Welcome, " + name);
            $("#signOutBtn").show();
        } else {
            $("#loginStatus").text("");
            $("#signOutBtn").hide();
        }
    }

    updateLoginInterface();


    /* =========================
       SIGN OUT
    ========================= */

    $("#signOutBtn").on("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInName");

        alert("You have been signed out.");

        updateLoginInterface();
    });


    /* =========================
       TECH SEARCH
    ========================= */

    function filterPosts() {
        const searchValue =
            $("#postSearch").val().toLowerCase().trim();

        $(".post-card").each(function () {
            const cardText =
                $(this).text().toLowerCase();

            if (cardText.includes(searchValue)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $("#postSearch").on("input keyup", function () {
        filterPosts();
    });


    /* =========================
       CATEGORY FILTER
    ========================= */

    $(".category-btn").on("click", function () {
        const category =
            $(this).data("category");

        $(".category-btn").removeClass("active");
        $(this).addClass("active");

        const searchValue =
            $("#postSearch").val().toLowerCase().trim();

        $(".post-card").each(function () {
            const card = $(this);
            const cardText = card.text().toLowerCase();
            const cardCategory =
                String(card.data("category") || "").toLowerCase();

            const matchesSearch =
                cardText.includes(searchValue);

            const matchesCategory =
                category === "all" ||
                category === "" ||
                cardCategory === String(category).toLowerCase();

            if (matchesSearch && matchesCategory) {
                card.show();
            } else {
                card.hide();
            }
        });
    });


    /* =========================
       CRUD
    ========================= */

    let books = JSON.parse(
        localStorage.getItem("books")
    ) || [
        {
            id: 1,
            title: "Little Women",
            author: "Louisa May Alcott",
            year: 1868
        },
        {
            id: 2,
            title: "Harry Potter",
            author: "J.K. Rowling",
            year: 1997
        }
    ];


    function saveBooks() {
        localStorage.setItem(
            "books",
            JSON.stringify(books)
        );
    }


    function displayBooks() {
        const tableBody =
            $("#bookTableBody");

        if (tableBody.length === 0) {
            return;
        }

        tableBody.empty();

        books.forEach(function (book) {
            tableBody.append(`
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.year}</td>
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


    /* =========================
       CREATE BOOK
    ========================= */

    $("#bookForm").on("submit", function (e) {
        e.preventDefault();

        const title =
            $("#bookTitle").val().trim();

        const author =
            $("#bookAuthor").val().trim();

        const year =
            $("#bookYear").val().trim();

        if (
            title === "" ||
            author === "" ||
            year === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const newBook = {
            id:
                books.length > 0
                    ? Math.max(...books.map(book => book.id)) + 1
                    : 1,

            title: title,
            author: author,
            year: Number(year)
        };

        books.push(newBook);

        saveBooks();
        displayBooks();

        this.reset();

        alert("Book added successfully!");
    });


    /* =========================
       UPDATE BOOK
    ========================= */

    $(document).on(
        "click",
        ".edit-book",
        function () {

            const id =
                Number($(this).data("id"));

            const book =
                books.find(function (item) {
                    return item.id === id;
                });

            if (!book) {
                return;
            }

            const newTitle =
                prompt("Enter book title:", book.title);

            if (newTitle === null) {
                return;
            }

            const newAuthor =
                prompt("Enter author:", book.author);

            if (newAuthor === null) {
                return;
            }

            const newYear =
                prompt("Enter year:", book.year);

            if (newYear === null) {
                return;
            }

            book.title =
                newTitle.trim();

            book.author =
                newAuthor.trim();

            book.year =
                Number(newYear);

            saveBooks();
            displayBooks();
        }
    );


    /* =========================
       DELETE BOOK
    ========================= */

    $(document).on(
        "click",
        ".delete-book",
        function () {

            const id =
                Number($(this).data("id"));

            const confirmed =
                confirm(
                    "Are you sure you want to delete this book?"
                );

            if (!confirmed) {
                return;
            }

            books =
                books.filter(function (book) {
                    return book.id !== id;
                });

            saveBooks();
            displayBooks();
        }
    );


    /* =========================
       API
    ========================= */

    $("#apiSearch").on("input", function () {

        const query =
            $(this).val().trim();

        if (query === "") {
            $("#apiResults").empty();
            $("#apiStatus").text("");
            return;
        }

        $("#apiStatus").text("Loading...");

        fetch(
            "https://openlibrary.org/search.json?q=" +
            encodeURIComponent(query)
        )
            .then(function (response) {

                if (!response.ok) {
                    throw new Error("API request failed");
                }

                return response.json();
            })

            .then(function (data) {

                $("#apiResults").empty();

                const books =
                    data.docs.slice(0, 6);

                $("#apiStatus").text(
                    "Found " +
                    data.numFound +
                    " books. Showing " +
                    books.length +
                    " results."
                );

                books.forEach(function (book) {

                    const title =
                        book.title || "Unknown title";

                    const author =
                        book.author_name
                            ? book.author_name[0]
                            : "Unknown author";

                    const year =
                        book.first_publish_year
                            || "Unknown";

                    $("#apiResults").append(`
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        ${title}
                                    </h5>

                                    <p class="card-text">
                                        Author: ${author}
                                    </p>

                                    <p class="card-text">
                                        First published: ${year}
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
                    "Sorry, something went wrong. Please try again."
                );

                $("#apiResults").empty();
            });
    });


    /* =========================
       FAQ
    ========================= */

    $(".faq-question").on("click", function () {

        const answer =
            $(this).next(".faq-answer");

        answer.slideToggle(300);

        const indicator =
            $(this).find(".faq-icon");

        if (indicator.text() === "+") {
            indicator.text("−");
        } else {
            indicator.text("+");
        }
    });


    /* =========================
       TRAVEL GALLERY
    ========================= */

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
                .fadeOut(150, function () {

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
                });
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
                .fadeOut(150, function () {

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
                });
        }
    );


    /* =========================
       LIGHTBOX KEYBOARD
    ========================= */

    $(document).on(
        "keydown",
        function (e) {

            if (
                $("#lightbox").is(":visible")
            ) {

                if (
                    e.key === "ArrowLeft"
                ) {
                    $("#prevImage").click();
                }

                if (
                    e.key === "ArrowRight"
                ) {
                    $("#nextImage").click();
                }

                if (
                    e.key === "Escape"
                ) {
                    $("#closeLightbox").click();
                }
            }
        }
    );

});
