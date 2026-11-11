$(document).ready(function () {

    $("#registrationForm").on("submit", function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();
        let message = $("#message").val().trim();

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let valid = true;

        $(".error-message").text("");
        $(".success-message").text("");

        if (name === "") {
            $("#nameError").text("Name is required");
            valid = false;
        }

        if (!emailPattern.test(email)) {
            $("#emailError").text("Enter a valid email");
            valid = false;
        }

        if (message === "") {
            $("#messageError").text("Message is required");
            valid = false;
        }

        if (password.length < 6) {
            $("#passwordError").text("Password must contain at least 6 characters");
            valid = false;
        }

        if (password !== confirmPassword) {
            $("#confirmPasswordError").text("Passwords do not match");
            valid = false;
        }

        if (valid) {
            $("#formSuccess").text("Registration successful!");
            this.reset();
            $("#passwordStrength").text("");
        }
    });

    $("#password").on("input", function () {
        let password = $(this).val();
        let result = "";

        if (password.length === 0) {
            result = "";
        } else if (password.length < 6) {
            result = "Weak password";
        } else if (password.length < 10) {
            result = "Medium password";
        } else {
            result = "Strong password";
        }

        $("#passwordStrength").text(result);
    });

    $("#searchInput").on("input", function () {
        let search = $(this).val().toLowerCase();

        $(".filter-item").each(function () {
            let text = $(this).text().toLowerCase();

            if (text.includes(search)) {
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
            if (category === "all" || $(this).data("category") === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#gallery img").on("click", function () {
        let src = $(this).attr("src");

        $("#lightboxImage").attr("src", src);
        $("#lightbox").fadeIn(300);
    });

    $("#closeLightbox").on("click", function () {
        $("#lightbox").fadeOut(300);
    });

    $("#lightbox").on("click", function (e) {
        if (e.target === this) {
            $(this).fadeOut(300);
        }
    });

});
