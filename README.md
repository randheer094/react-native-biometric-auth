# React Native Biometric Auth

React native biometric Auth is a bridge to Android/iOS for biometric authentication.

## Feature List

1. Check if Biometric authentication enabled on the device.
2. Authenticate user using Biometric with a fallback mechanism to passcode or device password.
3. Supported on both Android and iOS.

### How to use

#### Installation
`npm i rn-biometric-authentication`

### Link / AutoLinking

On React Native 0.60+ the [CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

## Additional configuration

#### iOS

This package requires an iOS target SDK version of iOS 10 or higher

Ensure that you have the `NSFaceIDUsageDescription` entry set in your react native iOS project, or Face ID will not work properly.  This description will be will be presented to the user the first time a biometrics action is taken, and the user will be asked if they want to allow the app to use Face ID.  If the user declines the usage of face id for the app, the `isSensorAvailable` function will indicate biometrics is unavailable until the face id permission is specifically allowed for the app by the user.

#### Android

This package requires a compiled SDK version of 29 (Android 10.0) or higher

## Methods

### isSensorAvailable()

Detects what type of biometric sensor is available.  Returns a `Promise` that resolves to an object with details about biometrics availability

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| available | bool | A boolean indicating if biometrics is available or not |
| biometryType | string | A string indicating what type of biometrics is available. `TouchID`(iOS), `FaceID`(iOS), `Biometrics`(Android), or `undefined` if biometrics is not available. |
| error | string | An error message indicating why biometrics may not be available. `undefined` if there is no error. |

__Example__

```js
import ReactNativeBiometricAuth from 'rn-biometric-authentication'

ReactNativeBiometricAuth.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      console.log('ReactNativeBiometricAuth', 'TouchID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      console.log('ReactNativeBiometricAuth', 'FaceID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      console.log('ReactNativeBiometricAuth', 'Biometrics is supported')
    } else {
      console.log('ReactNativeBiometricAuth', 'Biometrics not supported')
    }
  })
```

### simplePrompt(options)

Prompts the user for their fingerprint or face id. Returns a `Promise` that resolves if the user provides a valid biometrics or cancel the prompt, otherwise the promise rejects.

__Options Object__

| Parameter | Type | Description | iOS | Android |
| --- | --- | --- | --- | --- |
| promptMessage | string | Message that will be displayed in the biometrics prompt | ✔ | ✔ |
| cancelButtonText | string | Text to be displayed for the cancel button on biometric prompts, defaults to `Cancel` | ✖ | ✔ |
| isDeviceAuthEnabled | boolean | Enable fallback to device credential for authentication. | ✖ | ✔ |
| fallbackText | string | Fallback text to be displayed for passcode if `TouchID` or `FaceID` authentication failed. | ✔ | ✖ |

__Result Object__

| Property | Type | Description |
| --- | --- | --- |
| success | bool | A boolean indicating if the biometric prompt succeeded, `false` if the users cancels the biometrics prompt |
| error | string | An error message indicating why the biometric prompt failed. `undefined` if there is no error. |

__Example__

```js
import ReactNativeBiometricAuth from 'rn-biometric-authentication'

ReactNativeBiometricAuth.simplePrompt({promptMessage: 'Authenticate'})
  .then((resultObject) => {
    const { success } = resultObject

    if (success) {
      console.log('ReactNativeBiometricAuth', 'Success')
    } else {
      console.log('ReactNativeBiometricAuth', 'Cancelled')
    }
  })
  .catch(() => {
    console.log('ReactNativeBiometricAuth', 'Failed')
  })
```

### Inspiration
This library uses some code from [react-native-biometrics](https://github.com/SelfLender/react-native-biometrics). Added options to fallback to the device credentials for authentication. 
Removed some feature to make it simple to use for authentication purpose only.
