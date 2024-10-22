
# RWTH-Online 2FA-Bypass

## Description

This browser extension let's you automatically generate and fill in the required 2-FA TOTP-Tokens, so you don't have to.

## Installation

### Firefox

Go to Releases and choose the latest version and click the .xpi file or just click this [link](https://github.com/UnrealCryptoCore/rwth2FABypass/releases/download/v1.1/rwth_2fa_bypass-1.1.xpi).
If the installation does not start automatically you may need to download the file and install it manually.

### Chrome

Installing the extension in Chromium based browsers is as of right now only possible in developer mode by installing the .zip file under [Releases](https://github.com/UnrealCryptoCore/rwth2FABypass/releases/) or by cloning the repo and selecting the folder as the extension.

## Usage

1. Create a new TOTP-Token in the rwth-aachen selfservice.
2. Click on Token Secret and copy the 32-character long key in the clipboard.
3. Open the extension and paste the key in the specified textfield and hit save.
4. The extension should have generated a new code. Use it to verify your token and finish the creation process.

Hint: The second textfield is used to specify part of the name of your TOTP-Token, so that you don't need to manually select the right token every time.
Second hint: Save your secret key somewhere so you can use the extension on multiple devices with a single token.
