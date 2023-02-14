const answers = document.querySelectorAll(".answer-text");
answers.forEach((answer) => {
	answer.addEventListener("click", (e) => {
		if (e.target.parentElement.classList.contains("correct")) {
			e.target.parentElement.parentElement.parentElement
				.querySelectorAll(".success")
				.forEach((success) => {
					success.classList.add("show");

					setTimeout(() => {
						success.classList.remove("show");
					}, 1500);
				});
		} else {
			e.target.parentElement.parentElement.parentElement
				.querySelectorAll(".failure")
				.forEach((failure) => {
					failure.classList.add("show");

					setTimeout(() => {
						failure.classList.remove("show");
					}, 1500);
				});
		}
	});
});
