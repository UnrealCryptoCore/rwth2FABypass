function openLink(addr) {
    browser.tabs.update({ url: addr });
    window.close();
}

function updateToggleBtnText(v) {
    document.getElementById('toggle-btn').checked = v;
}

function toggleEnabled() {
    isEnabled().then((res) => {
        setEnabled(!res);
        updateToggleBtnText(!res);
    });
}

function clearStorage() {
    browser.storage.local.clear();
}

function onSaveTOTP() {
    const keyInp = document.getElementById("key-input");
    const key = keyInp.value;
    if (key === "") {
        return;
    }
    setTOTP(key).then(() => {
        generatePass();
        keyInp.value = "";
        updateInputKey();
    });
}

function onSaveTOTPName() {
    const nameInp = document.getElementById("name-input");
    const name = nameInp.value;
    if (name === "") {
        return;
    }
    setTOTPName(name).then(() => {
        nameInp.value = "";
        updateInputName();
    });
}

async function generatePass() {
    const verify = document.getElementById("verify-token");
    const key = await getTOTP();
    const pass = await totp(key);
    verify.innerText = pass;
}

async function updateInputKey() {
    const res = await getTOTP();
    if (!res) {
        document.getElementById('key-input').style.borderColor = 'red';
    } else {
        document.getElementById('key-input').style.borderColor = 'grey';
    }
}

async function updateInputName() {
    const res = await getTOTPName();
    if (!res) {
        document.getElementById('name-input').style.borderColor = 'red';
    } else {
        document.getElementById('name-input').style.borderColor = 'grey';
    }
}

updateInputKey();
updateInputName();

isEnabled().then((res) => {
    updateToggleBtnText(res);
});

document.getElementById('clear-btn').addEventListener('click', () => {
    clearStorage();
});

document.getElementById('generate-btn').addEventListener('click', () => {
    generatePass();
});

document.getElementById('toggle-btn').addEventListener('click', () => {
    toggleEnabled();
});

document.getElementById('key-btn').addEventListener('click', () => {
    onSaveTOTP();
});

document.getElementById('name-btn').addEventListener('click', () => {
    onSaveTOTPName();
});

document.getElementById('tfa-bypass-open').addEventListener('click', () => {
    const tfaBypass = document.getElementById('tfa-bypass');
    if (tfaBypass.style.display === 'none' || tfaBypass.style.display === '') {
        tfaBypass.style.display = 'block';
    } else {
        tfaBypass.style.display = 'none';
    }
});

document.getElementById('rwthonline-login').addEventListener('click', (e) => {
    e.preventDefault();
    openLink('https://online.rwth-aachen.de/RWTHonline/Login');
});

document.getElementById('moodle-login').addEventListener('click', (e) => {
    e.preventDefault();
    openLink('https://moodle.rwth-aachen.de');
});
document.getElementById('selfservice-login').addEventListener('click', (e) => {
    e.preventDefault();
    openLink('https://idm.rwth-aachen.de/selfservice');
});
