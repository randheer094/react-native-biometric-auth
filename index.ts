import {NativeModules} from 'react-native';

const {ReactNativeBiometricAuth: bridge} = NativeModules;

/**
 * Type alias for possible biometry types
 */
export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';

interface IsSensorAvailableResult {
    available: boolean
    biometryType?: BiometryType
    error?: string
}

interface SimplePromptOptions {
    promptMessage: string
    cancelButtonText?: string
}

interface SimplePromptOptionAndroid extends SimplePromptOptions {
    isDeviceAuthEnabled: boolean
}

interface SimplePromptOptionIOS extends SimplePromptOptions {
    fallbackText?: string
}

interface SimplePromptResult {
    success: boolean
    error?: string
}

module ReactNativeBiometricAuth {
    /**
     * Enum for touch id sensor type
     */
    export const TouchID = 'TouchID';
    /**
     * Enum for face id sensor type
     */
    export const FaceID = 'FaceID';
    /**
     * Enum for generic biometrics (this is the only value available on android)
     */
    export const Biometrics = 'Biometrics';

    /**
     * Returns promise that resolves to an object with object.biometryType = Biometrics | TouchID | FaceID
     * @returns {Promise<Object>} Promise that resolves to an object with details about biometrics available
     */
    export function isSensorAvailable(): Promise<IsSensorAvailableResult> {
        return bridge.isSensorAvailable();
    }

    /**
     * Prompts user with biometrics dialog using the passed in prompt message and
     * returns promise that resolves to an object with object.success = true if the user passes,
     * object.success = false if the user cancels, and rejects if anything fails
     * @param {Object} simplePromptOption
     * @returns {Promise<Object>}  Promise that resolves an object with details about the biometrics result
     */
    export function simplePrompt(simplePromptOption: SimplePromptOptionAndroid | SimplePromptOptionIOS): Promise<SimplePromptResult> {
        if (!simplePromptOption.cancelButtonText) {
            simplePromptOption.cancelButtonText = 'Cancel';
        }

        return bridge.simplePrompt(simplePromptOption);
    }
}

export default ReactNativeBiometricAuth;
