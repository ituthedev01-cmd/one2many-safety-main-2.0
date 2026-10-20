# One2Many Safety

An Android-first, mobile-responsive React frontend prototype for finding support,
planning a check-in, and documenting notes more safely in South Africa.

This is a web frontend, not a native Android APK. It has no emergency-dispatch
backend: the check-in timer does not send alerts or share location, and notes
stay in memory on the current screen only. The support directory launches phone
calls from the device and does not verify provider availability.

The account screen includes sign-in, registration, email-code verification, and
password-reset previews. Authentication is not connected to a backend: account
details are not saved or sent, email codes are not delivered or validated, and
password changes are not persisted. Do not enter real personal information.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://one2many-safety.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7d4af7c9-c83c-4cb6-b214-b3909f1fdb95).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Run in Visual Studio Code

Open the folder containing this `README.md` in VS Code and use its integrated
terminal. Install Node.js and npm first if needed — [install Node.js](https://nodejs.org/).

```sh
npm install
npm run dev
```

## Android

The interface is responsive and designed for small screens, and can be opened
in an Android browser. This repository does not include a native Android
wrapper, app-store package, or authentication service.
