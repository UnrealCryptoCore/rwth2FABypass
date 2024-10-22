async function base32Decode(input) {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const buffer = Array(input.length * 5 / 8);
    let v;
    let a;
    let b;
    let c;
    let d;
    for (let i = 0; i < buffer.length * 8; i++) {
        a = Math.floor(i / 8);
        b = Math.floor(i / 5);
        c = 4 - (i % 5);
        d = 7 - (i % 8);
        v = base32Chars.indexOf(input[b]) & 0x1F;
        buffer[a] |= ((v >> c) & 1) << d;
    }
    return new Uint8Array(buffer);
};

async function hmac(key, message) {
    const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-1", }, false, ["sign"]);
    return crypto.subtle.sign("HMAC", cryptoKey, message);
}

async function totp(secret, timeStep = 30, digits = 6) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeCounter = Math.floor(currentTime / timeStep);
    const timeBuffer = new ArrayBuffer(8);
    const timeArray = new Uint8Array(timeBuffer);
    const view = new DataView(timeBuffer);
    view.setBigUint64(0, BigInt(timeCounter));

    const decodedSecret = await base32Decode(secret);
    const hmacResult = await hmac(decodedSecret, timeArray);

    const hmacArray = new Uint8Array(hmacResult);
    const offset = hmacArray[hmacArray.length - 1] & 0xf;
    const truncatedHash = (hmacArray[offset] & 0x7f) << 24 |
        (hmacArray[offset + 1] & 0xff) << 16 |
        (hmacArray[offset + 2] & 0xff) << 8 |
        (hmacArray[offset + 3] & 0xff);

    const otp = truncatedHash % Math.pow(10, digits);
    return otp.toString().padStart(digits, '0');
};

window.base32Decode = base32Decode;
window.hmac = hmac;
window.totp = totp;
