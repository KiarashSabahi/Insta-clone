const $emailInput = document.querySelector("#emailInput")
const $nickNameInput = document.querySelector("#nickNameInput");
const $userNameInput = document.querySelector("#userNameInput");
const $passwordInput = document.querySelector("#passwordInput");
const $signUpButton = document.querySelector("#signUpButton");
const $loginButton = document.querySelector("#loginButton");



$signUpButton.addEventListener("click", async (e) => {
    e.preventDefault();
    async function getUser() {
        try {
            const headers = new Headers();
            headers.append("content-type", "application/json");
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({user: {
                        userName: $userNameInput.value,
                        password: $passwordInput.value,
                        email: $emailInput.value,
                        nickName: $nickNameInput.value
                    }}),
                headers,
                credentials: "include",
                redirect: "follow"
            };
            const response = await fetch("/user/signUp", requestOptions);
            return await response.json();
        } catch (e) {
            console.log(e)
        }
    }

    const response = await getUser();
    console.log(response)
    if(response) {
        console.log(response.error)
        return alert(response.error);
    } else {
        window.location.href = "/";
    }
});

$loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location.href = "/user/login";
});

