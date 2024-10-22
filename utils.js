window.browser = typeof browser === 'undefined' ? chrome : browser;

async function setEnabled(b) {
    await browser.storage.local.set({ enabled: b });
}

async function isEnabled() {
    const res = (await browser.storage.local.get("enabled")).enabled;
    return res !== undefined ? res : true;
}

async function setTOTP(key) {
    await browser.storage.local.set({ key: key });
}

async function getTOTP() {
    const res = (await browser.storage.local.get("key")).key;
    return res;

}

async function setTOTPName(name) {
    await browser.storage.local.set({ totpname: name});
}

async function getTOTPName() {
    const res = (await browser.storage.local.get("totpname")).totpname;
    return res;

}

window.setEnabled = setEnabled;
window.isEnabled = isEnabled;
window.setTOTP = setTOTP;
window.getTOTP = getTOTP;
window.setTOTPName = setTOTPName;
window.getTOTPName = getTOTPName;
