const $shareButton = document.querySelector("#shareButton");
const $image = document.querySelector("#image");


$shareButton.addEventListener("click", async (e) => {
    e.preventDefault();
    // async function getUser() {
    //     try {
    //         const headers = new Headers();
    //         headers.append("content-type", "application/json");
    //         const requestOptions = {
    //             method: "POST",
    //             body: JSON.stringify({userInput: $loginInput.value, password: $loginPassword.value}),
    //             headers,
    //             credentials: "include",
    //             redirect: "follow"
    //         };
    //         const response = await fetch("/user/login", requestOptions);
    //         return await response.json();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    //
    // const response = await getUser();
    // const user = response.user;
    // if(!user) {
    //     return alert(response.error);
    // } else {
    //     window.location.href = "/";
    // }
});


