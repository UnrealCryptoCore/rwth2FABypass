function handleSelect2FAType(elem, name) {
    const next = document.querySelector("form > .btn-primary");
    console.log(elem);
    elem.onchange = () => {
        console.log("change");
    };

    let option;
    for (i = 0; i, elem.length; i++) {
        option = elem[i];
        const text = option.innerText;
        console.log(text, name);
        if (text.includes(name)) {
            break;
        }
    }
    elem.value = option.value;
    next.click();
}

async function handleOtpInput(elem, key) {
    const next = document.querySelector("form > .btn-primary");
    const password = await totp(key);
    elem.value = password;
    next.click();
}

async function main() {
    if (!await isEnabled()) {
        return;
    }

    const key = await getTOTP();
    if (!key) {
        return;
    }

    const name = await getTOTPName();
    console.log(name);
    if (!name) {
        return;
    }

    const tauthElement = document.getElementById("fudis_selected_token_ids_input");
    if (tauthElement) {
        handleSelect2FAType(tauthElement, name);
        return;
    }
    const otpElem = document.getElementById("fudis_otp_input");
    if (otpElem) {
        await handleOtpInput(otpElem, key);
        return;
    }
}

main();
