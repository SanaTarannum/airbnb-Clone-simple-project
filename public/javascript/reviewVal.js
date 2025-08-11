document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  const ratingInput = document.getElementById("rating");
  const commentInput = document.getElementById("comment");
  const ratingError = document.querySelector(".rating-error");
  const commentError = document.querySelector(".comment-error");

  form.addEventListener("submit", function (e) {
    let valid = true;

    if (!ratingInput.value) {
      ratingError.classList.remove("hidden");
      valid = false;
    } else {
      ratingError.classList.add("hidden");
    }

    if (!commentInput.value.trim()) {
      commentError.classList.remove("hidden");
      valid = false;
    } else {
      commentError.classList.add("hidden");
    }

    if (!valid) {
      e.preventDefault(); // form ko submit hone se roken
    }
  });
});
