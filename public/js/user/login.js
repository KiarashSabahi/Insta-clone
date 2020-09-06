const $loginInput = document.querySelector("#loginInput");
const $loginPassword = document.querySelector("#loginPassword");
const $loginButton = document.querySelector("#loginButton")
const $resetPasswordButton = document.querySelector("#resetPasswordButton");
const $signUpButton = document.querySelector("#signUpButton");

$loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    async function getUser() {
        try {
            const headers = new Headers();
            headers.append("content-type", "application/json");
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({userInput: $loginInput.value, password: $loginPassword.value}),
                headers,
                credentials: "include",
                redirect: "follow"
            };
            const response = await fetch("/user/login", requestOptions);
            return await response.json();
        } catch (e) {
            console.log(e)
        }
    }

    const response = await getUser();
    const user = response.user;
    if(!user) {
        return alert(response.error);
    } else {
        window.location.href = "/";
    }
    console.log(user)
});

$resetPasswordButton.addEventListener("click", async (e) => {
    e.preventDefault();
    return alert("Not yet, just remember it for now :)");
});

$signUpButton.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = "/user/signUp";
});
