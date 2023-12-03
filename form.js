

const form = document.getElementById("form");
const users = [];

// проверка имени
const firstName = document.getElementById("firstname");
const firstNameError = document.getElementById("firstNameError");
firstName.addEventListener("input", checkName);
function checkName() {
	const firstNameValue = firstName.value.trim();
	if (firstName.validity.tooShort) {
		let minlength = firstName.getAttribute("minlength");
		firstName.classList.add("error");
		firstNameError.textContent = `Минимальное значение не может быть меньше, чем  ${minlength}`;
	} else if (firstName.validity.tooLong) {
		let maxlength = firstName.getAttribute("maxlength");
		firstName.classList.add("error");
		firstNameError.textContent = `Максимальное значение не может быть больше, чем ${maxlength}`;
	} else if (firstName.validity.typeMismatch) {
		firstName.classList.add("error");
		firstNameError.textContent = 'поле "имя" может содержать только буквы и дефис';
	} else if (firstName.validity.patternMismatch) {
		firstName.classList.add("error");
		firstNameError.textContent = 'поле "имя" может содержать только буквы и дефис';
	} else if (firstName.validity.valueMissing) {
		firstName.classList.add("error");
		firstNameError.textContent = `поле "имя" не может быть пустым`;
	} else {
		firstNameError.textContent = "";
		firstName.classList.remove("error");
		return firstNameValue;
	}
}



// email
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
email.addEventListener("change", checkEmail);
function checkEmail() {
	const emailValue = email.value.trim();
	const patternEmail = /^[a-zA-Zа-яА-Я.-_]+@[a-zA-Zа-яА-Я]+\.[a-zA-Zа-яА-Я]{2,}$/;
	if (emailValue === "") {
		email.classList.add("error");
		emailError.textContent = `поле "email" не может быть пустым`;
	} else if (!patternEmail.test(emailValue)) {
		email.classList.add("error");
		emailError.textContent = `Поле email должно иметь формат itgirls@mail.edu`;
	} else {
		emailError.textContent = "";
		email.classList.remove("error");
		return emailValue;
	}
}

// возраст
const age = document.getElementById("age");
const ageError = document.getElementById("ageError");
age.addEventListener("input", checkAge);
function checkAge() {
	const ageValue = age.value;
	let message = "";
	if (age.validity.rangeUnderflow) {
		let min = age.getAttribute("min");
		message = `Минимальный возраст не может быть меньше, чем  ${min}`;
	} else if (age.validity.rangeOverflow) {
		let max = age.getAttribute("max");
		message = `Максимальный возраст не может быть больше, чем ${max}`;
	} else if (age.validity.typeMismatch) {
		age.textContent = 'поле "возраст" может содержать только число';
	} else if (age.validity.stepMismatch) {
		message = `Введите количество полных лет`;
	} else if (age.validity.valueMissing) {
		message = `поле "возраст" не может быть пустым`;
	}

	if (!age.validity.valid) {
		age.classList.add("error");
		ageError.textContent = message;
	} else {
		ageError.textContent = "";
		age.classList.remove("error");
		return ageValue;
	}
}

//пол
function checkSex() {
	const sex = document.getElementById("sex");
	const sexChoices = sex.querySelectorAll(".radio");
	let sexChoice = ""
	for (let choice of sexChoices) {
		if (choice.checked) {
			sexChoice = choice.value;
			return sexChoice
		}
	};
}


//профессия
const job = document.getElementById("job");
const jobError = document.getElementById("jobError");
job.addEventListener("input", checkJob);
function checkJob() {
	const jobValue = job.value;
	if (jobValue === "") {
		job.classList.add("error");
		jobError.textContent = `поле "профессия" не может быть пустым`;
	} else {
		jobError.textContent = "";
		job.classList.remove("error");
		return jobValue;
	}
}
//пароль
const password = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
password.addEventListener("input", checkPassword);
function checkPassword() {
	const passwordValue = password.value;
	const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;
	if (passwordValue === "") {
		password.classList.add("error");
		passwordError.textContent = `поле "пароль" не может быть пустым`;
	} else if (!patternPassword.test(passwordValue)) {
		password.classList.add("error");
		passwordError.textContent = `поле должно содержать не менее 8 символов, как минимум одну заглавную букву, одну строчную букву и одну цифру`;
	} else {
		passwordError.textContent = "";
		password.classList.remove("error");
		return passwordValue;
	}
}
//проверка пароля
const passwordRepeat = document.getElementById("password_repeat");
const passwordRepeatError = document.getElementById("passwordRepeatError");
passwordRepeat.addEventListener("input", checkPasswordRepeat);
function checkPasswordRepeat() {
	const passwordRepeatValue = passwordRepeat.value;
	const passwordValue = password.value;
	const patternPasswordRepeat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/;
	if (passwordRepeatValue === "") {
		passwordRepeat.classList.add("error");
		passwordRepeatError.textContent = `поле "повтор пароля" не может быть пустым`;
	} else if (!patternPasswordRepeat.test(passwordRepeatValue)) {
		passwordRepeat.classList.add("error");
		passwordRepeatError.textContent = `поле должно содержать не менее 8 символов, как минимум одну заглавную букву, одну строчную букву и одну цифру`;
	} else if (passwordRepeatValue !== passwordValue){
		passwordRepeat.classList.add("error");
		passwordRepeatError.textContent = `введенные пароли должны совпадать`;
	} else {
		passwordRepeatError.textContent = "";
		passwordRepeat.classList.remove("error");
		return passwordRepeatValue;
	}
}

const submit = document.getElementById("submit");
const messageDiv = document.getElementById("message");
form.addEventListener("submit", function(event) {
	event.preventDefault();
	checkSex();
	checkName();
	checkEmail();
	checkAge();
	checkJob();
	checkPassword();
	checkPasswordRepeat();
	if (
	checkName()
	&& checkEmail()
	&& checkAge()
	&& checkJob()
	&& checkPassword()
	&& checkPasswordRepeat()) {
		showMessage(`Добро пожаловать, ${firstName.value}!`);
		let newUser = {firstName: checkName(), email: checkEmail(), age: checkAge(), sex: checkSex(), job: checkJob(), password: checkPasswordRepeat()};
		users.push(newUser);
		form.reset();
		messageDiv.classList.remove("errormessage");
		messageDiv.classList.add("label");
		console.log(users);
	} else {
		showMessage("Для регистрации требуется заполнить все обязательные поля!");
	}
});

const showMessage = text => {
	messageDiv.textContent = text;
};

