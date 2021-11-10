# Kovvi

Kovvi(koh-vee) is a cross-platform mobile app built with React Native that allows users to search COVID-19 data (from [this API](https://disease.sh/)) in a region (countries, provinces, USA - states & counties) and view vaccine trial data.

## Project Requirements

- Node v.~14.0.0+
- Expo v.~42.0.1

### Project Setup

- Clone the repo.
- Install `expo-cli` globally via `npm install -g expo-cli`.
- Navigate to cloned repo, then `cd covid-mapper`.
- Install dependencies via `npm install`.
- Run `expo start` to open development server on `http://localhost:19002/`.


- Mobile Simulators Setup
  - #### Android 
    - Download [Android Studio](https://developer.android.com/studio?gclsrc=ds&gclid=CKPM-_arjvQCFYIXgQodiX8FIw&gclsrc=ds#downloads)
    - Create a new AVD and run it.
    - In the same terminal where expo-cli is running, press `a` and `enter/return`.

  - #### iOS(Macs Only)
    - Install XCode from App Store.
    - Open XCode.
    - In the same terminal where expo-cli is running, press `i` and `return`.
    - Phone simulator should install `Expo Go`.

- To run the app on physical mobile device, install `Expo Go` app from Google Play or App Store.
  - Open Camera and scan the QR code in `http://localhost:19002/`. Make sure development server is running. 

### Development Process

- When starting work on a new release version, increment `minor` version(example: 1.2.0 to 1.3.0).



