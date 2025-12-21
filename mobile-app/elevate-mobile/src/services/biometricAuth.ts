import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Biometric authentication service for secure login
 */

const SECURE_STORE_KEYS = {
  BIOMETRIC_ENABLED: 'biometric_enabled',
  USER_CREDENTIALS: 'user_credentials',
};

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACIAL_RECOGNITION = 'facial_recognition',
  IRIS = 'iris',
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
  biometricType?: BiometricType;
}

/**
 * Check if device supports biometric authentication
 */
export async function isBiometricSupported(): Promise<boolean> {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    return compatible;
  } catch (error) {
    console.error('Error checking biometric support:', error);
    return false;
  }
}

/**
 * Check if biometric authentication is enrolled
 */
export async function isBiometricEnrolled(): Promise<boolean> {
  try {
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return enrolled;
  } catch (error) {
    console.error('Error checking biometric enrollment:', error);
    return false;
  }
}

/**
 * Get available biometric types
 */
export async function getAvailableBiometricTypes(): Promise<BiometricType[]> {
  try {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const biometricTypes: BiometricType[] = [];

    types.forEach((type) => {
      switch (type) {
        case LocalAuthentication.AuthenticationType.FINGERPRINT:
          biometricTypes.push(BiometricType.FINGERPRINT);
          break;
        case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
          biometricTypes.push(BiometricType.FACIAL_RECOGNITION);
          break;
        case LocalAuthentication.AuthenticationType.IRIS:
          biometricTypes.push(BiometricType.IRIS);
          break;
      }
    });

    return biometricTypes;
  } catch (error) {
    console.error('Error getting biometric types:', error);
    return [];
  }
}

/**
 * Get biometric type name for display
 */
export function getBiometricTypeName(type: BiometricType): string {
  switch (type) {
    case BiometricType.FINGERPRINT:
      return Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint';
    case BiometricType.FACIAL_RECOGNITION:
      return Platform.OS === 'ios' ? 'Face ID' : 'Face Recognition';
    case BiometricType.IRIS:
      return 'Iris Recognition';
    default:
      return 'Biometric';
  }
}

/**
 * Authenticate with biometrics
 */
export async function authenticateWithBiometrics(
  promptMessage?: string
): Promise<BiometricAuthResult> {
  try {
    // Check if biometrics are available
    const isSupported = await isBiometricSupported();
    if (!isSupported) {
      return {
        success: false,
        error: 'Biometric authentication is not supported on this device',
      };
    }

    const isEnrolled = await isBiometricEnrolled();
    if (!isEnrolled) {
      return {
        success: false,
        error: 'No biometric authentication is enrolled on this device',
      };
    }

    // Get biometric type for message
    const types = await getAvailableBiometricTypes();
    const biometricType = types[0];
    const typeName = biometricType
      ? getBiometricTypeName(biometricType)
      : 'biometric';

    // Authenticate
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: promptMessage || `Authenticate with ${typeName}`,
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
      fallbackLabel: 'Use passcode',
    });

    if (result.success) {
      return {
        success: true,
        biometricType,
      };
    } else {
      return {
        success: false,
        error: result.error || 'Authentication failed',
      };
    }
  } catch (error) {
    console.error('Error during biometric authentication:', error);
    return {
      success: false,
      error: 'An error occurred during authentication',
    };
  }
}

/**
 * Check if biometric authentication is enabled for the app
 */
export async function isBiometricEnabled(): Promise<boolean> {
  try {
    const enabled = await SecureStore.getItemAsync(
      SECURE_STORE_KEYS.BIOMETRIC_ENABLED
    );
    return enabled === 'true';
  } catch (error) {
    console.error('Error checking biometric enabled status:', error);
    return false;
  }
}

/**
 * Enable biometric authentication
 */
export async function enableBiometric(
  email: string,
  password: string
): Promise<boolean> {
  try {
    // First authenticate to confirm user wants to enable
    const authResult = await authenticateWithBiometrics(
      'Enable biometric login'
    );

    if (!authResult.success) {
      return false;
    }

    // Store credentials securely
    const credentials = JSON.stringify({ email, password });
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.USER_CREDENTIALS,
      credentials
    );
    await SecureStore.setItemAsync(SECURE_STORE_KEYS.BIOMETRIC_ENABLED, 'true');

    return true;
  } catch (error) {
    console.error('Error enabling biometric:', error);
    return false;
  }
}

/**
 * Disable biometric authentication
 */
export async function disableBiometric(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER_CREDENTIALS);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.BIOMETRIC_ENABLED);
  } catch (error) {
    console.error('Error disabling biometric:', error);
  }
}

/**
 * Get stored credentials after biometric authentication
 */
export async function getStoredCredentials(): Promise<{
  email: string;
  password: string;
} | null> {
  try {
    const enabled = await isBiometricEnabled();
    if (!enabled) {
      return null;
    }

    // Authenticate first
    const authResult = await authenticateWithBiometrics('Login with biometric');
    if (!authResult.success) {
      return null;
    }

    // Get credentials
    const credentialsJson = await SecureStore.getItemAsync(
      SECURE_STORE_KEYS.USER_CREDENTIALS
    );
    if (!credentialsJson) {
      return null;
    }

    return JSON.parse(credentialsJson);
  } catch (error) {
    console.error('Error getting stored credentials:', error);
    return null;
  }
}

/**
 * Update stored credentials
 */
export async function updateStoredCredentials(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const enabled = await isBiometricEnabled();
    if (!enabled) {
      return false;
    }

    const credentials = JSON.stringify({ email, password });
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.USER_CREDENTIALS,
      credentials
    );
    return true;
  } catch (error) {
    console.error('Error updating stored credentials:', error);
    return false;
  }
}

/**
 * Authenticate for sensitive action (e.g., viewing sensitive data, making changes)
 */
export async function authenticateForAction(
  actionName: string
): Promise<boolean> {
  try {
    const result = await authenticateWithBiometrics(
      `Authenticate to ${actionName}`
    );
    return result.success;
  } catch (error) {
    console.error('Error authenticating for action:', error);
    return false;
  }
}

/**
 * Get biometric capability info for settings display
 */
export async function getBiometricInfo(): Promise<{
  supported: boolean;
  enrolled: boolean;
  enabled: boolean;
  types: BiometricType[];
  typeName: string;
}> {
  const supported = await isBiometricSupported();
  const enrolled = await isBiometricEnrolled();
  const enabled = await isBiometricEnabled();
  const types = await getAvailableBiometricTypes();
  const typeName =
    types.length > 0 ? getBiometricTypeName(types[0]) : 'Biometric';

  return {
    supported,
    enrolled,
    enabled,
    types,
    typeName,
  };
}

/**
 * Clear all biometric data (on logout)
 */
export async function clearBiometricData(): Promise<void> {
  await disableBiometric();
}
