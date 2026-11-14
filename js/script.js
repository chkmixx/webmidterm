$(document).ready(function () {
    let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    $("body").addClass("dark-theme");
    $("#themeToggle").text("☀️");
}

$("#themeToggle").on("click", function () {

    $("body").toggleClass("dark-theme");

    if ($("body").hasClass("dark-theme")) {
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

    $("#nameError").text("");
    return true;
}

function validateEmail() {
    let email = $("#email").val().trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        $("#emailError").text("Email is required.");
        return false;
    }

    if (!emailRegex.test(email)) {
        $("#emailError").text("Enter a valid email address.");
        return false;
    }

    $("#emailError").text("");
    return true;
}

function validateMessage() {
    let message = $("#message").val().trim();

    if (message === "") {
        $("#messageError").text("Message is required.");
        return false;
    }

    $("#messageError").text("");
    return true;
}

function validatePassword() {
    let password = $("#password").val();

    if (password === "") {
        $("#passwordError").text("Password is required.");
        return false;
    }

    if (password.length < 6) {
        $("#passwordError").text("Password must contain at least 6 characters.");
        return false;
    }

    $("#passwordError").text("");
    return true;
}

function validateConfirmPassword() {
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    if (confirmPassword === "") {
        $("#confirmPasswordError").text("Please confirm your password.");
        return false;
    }

    if (password !== confirmPassword) {
        $("#confirmPasswordError").text("Passwords do not match.");
        return false;
    }

    $("#confirmPasswordError").text("");
    return true;
}

$("#name").on("input blur", function () {
    validateName();
});

$("#email").on("input blur", function () {
    validateEmail();
});

$("#message").on("input blur", function () {
    validateMessage();
});

$("#password").on("input blur", function () {
    validatePassword();
});

$("#confirmPassword").on("input blur", function () {
    validateConfirmPassword();
});

$("#registrationForm").on("submit", function (e) {

    e.preventDefault();

    let validName = validateName();
    let validEmail = validateEmail();
    let validMessage = validateMessage();
    let validPassword = validatePassword();
    let validConfirmPassword = validateConfirmPassword();

    if (
        validName &&
        validEmail &&
        validMessage &&
        validPassword &&
        validConfirmPassword
    ) {
        $("#formSuccess").text("Registration successful!");

        $("#registrationForm")[0].reset();

        $("#passwordStrength").text("");
    } else {
        $("#formSuccess").text("");
    }
});


    $("#password").on("input", function () {

        let password = $(this).val();
        let text = "";

        if (password.length === 0) {
            text = "";
        } else if (password.length < 6) {
            text = "Weak password";
        } else if (password.length < 10) {
            text = "Medium password";
        } else {
            text = "Strong password";
        }

        $("#passwordStrength").text(text);
    });


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
                        <button class="btn btn-sm btn-dark edit-book" data-id="${book.id}">
                            Edit
                        </button>

                        <button class="btn btn-sm btn-danger delete-book" data-id="${book.id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

            $("#booksBody").append(row);
        });
    }


    displayBooks();


    $("#bookForm").on("submit", function (e) {

        e.preventDefault();

        let title = $("#bookTitle").val().trim();
        let author = $("#bookAuthor").val().trim();

        if (title === "" || author === "") {
            return;
        }

        let newId = books.length > 0
            ? Math.max(...books.map(book => book.id)) + 1
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

        let id = Number($(this).data("id"));

        let confirmed = confirm("Are you sure you want to delete this book?");

        if (confirmed) {
            books = books.filter(function (book) {
                return book.id !== id;
            });

            displayBooks();
        }
    });


    $(document).on("click", ".edit-book", function () {

        let id = Number($(this).data("id"));

        let book = books.find(function (book) {
            return book.id === id;
        });

        if (!book) {
            return;
        }

        let newTitle = prompt("Enter new book title:", book.title);

        if (newTitle === null) {
            return;
        }

        let newAuthor = prompt("Enter new author:", book.author);

        if (newAuthor === null) {
            return;
        }

        book.title = newTitle.trim();
        book.author = newAuthor.trim();

        displayBooks();
    });


    $("#searchInput").on("input", function () {

        let value = $(this).val().toLowerCase();

        $(".filter-item").each(function () {

            let text = $(this).text().toLowerCase();

            if (text.includes(value)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    $(".category-btn").on("click", function () {

        let category = $(this).data("category");

        $(".category-btn").removeClass("active");

        $(this).addClass("active");

        $(".filter-item").each(function () {

            let itemCategory = $(this).data("category");

            if (category === "all" || category === itemCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


 let currentImage = 0;

$("#gallery img").on("click", function () {

    currentImage = $("#gallery img").index(this);

    let image = $(this).attr("src");

    $("#lightboxImage")
        .attr("src", image)
        .hide()
        .fadeIn(300);

    $("#lightbox")
        .css("display", "flex")
        .hide()
        .fadeIn(300);

});


$("#closeLightbox").on("click", function () {

    $("#lightbox").fadeOut(300);

});


$("#prevImage").on("click", function (e) {

    e.stopPropagation();

    let images = $("#gallery img");

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    $("#lightboxImage").fadeOut(200, function () {

        $(this)
            .attr("src", images.eq(currentImage).attr("src"))
            .fadeIn(300);

    });

});


$("#nextImage").on("click", function (e) {

    e.stopPropagation();

    let images = $("#gallery img");

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    $("#lightboxImage").fadeOut(200, function () {

        $(this)
            .attr("src", images.eq(currentImage).attr("src"))
            .fadeIn(300);

    });

});


$("#lightbox").on("click", function (e) {

    if (e.target === this) {
        $(this).fadeOut(300);
    }

});


$("#lightboxImage").on("mouseenter", function () {

    $(this).animate({
        opacity: 0.85
    }, 150);

});


$("#lightboxImage").on("mouseleave", function () {

    $(this).animate({
        opacity: 1
    }, 150);

});

});
