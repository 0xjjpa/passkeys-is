import { PASSKEY_ERRORS } from "../constants/errors";
import { logger } from "./logger";

export type PasskeyCredentialResponse = {
  data: PublicKeyCredential | null;
  response: AuthenticatorAttestationResponse | AuthenticatorAssertionResponse | null; 
  error: string | null;
}

interface PasskeyStringResponse {
  data: string | null;
  error: string | null;
}

export type PasskeyRawIdResponse = PasskeyStringResponse;
export type PasskeyPublicKeyAsHexResponse = PasskeyStringResponse;

export const truncate = (word: string) => word && `...${word.substr(word.length - 10, word.length)}`

export class Passkey {
  // @TODO: Decide whether we want runtime public key credential management or keep static in all methods
  static _createdCredential: PublicKeyCredential;

  static getPublicKeyAsHexStringFromAttestationResponse({ response }: { response: AuthenticatorAttestationResponse}) {
    if (!response) {
      return { data: null, error: PASSKEY_ERRORS.INVALID_CREDENTIAL_RESPONSE };
    }
    try {
      const publicKey = response.getPublicKey();
      const publicKeyAsHex = Passkey.buf2hex(publicKey);
      logger.debug('(🪪,ℹ️) Public Key as Hex', publicKeyAsHex);
      return { data: publicKeyAsHex, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.CREDENTIAL_RESPONSE_HAS_NO_PUBLIC_KEY, e);
      return { data: null, error: PASSKEY_ERRORS.CREDENTIAL_RESPONSE_HAS_NO_PUBLIC_KEY }
    }
  }

  static async create({ appName, username, email }: { appName: string, username: string, email?: string }): Promise<PasskeyCredentialResponse> {
    logger.debug('(🪪,ℹ️) Creating credential');
    try {
      if (!navigator.credentials) {
        return { data: null, response: null, error: PASSKEY_ERRORS.BROWSER_DOES_NOT_SUPPORT_PASSKEY }
      }

      const credential = (await navigator.credentials.create({
        publicKey: Passkey.publicKeyCredentialCreationOptions(appName, username, email),
      })) as PublicKeyCredential;

      this._createdCredential = credential;
      return { data: credential, response: credential.response as AuthenticatorAttestationResponse, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL, e);
      return { data: null, response: null, error: PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL };
    }
  }

  static async get({ allowCredentials = [] }: { allowCredentials?: PublicKeyCredentialDescriptor[]}): Promise<PasskeyCredentialResponse> {
    logger.debug('(🪪,ℹ️) Obtaining credentials');
    try {
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(16),
        timeout: 60000,
        allowCredentials,
      };

      const assertion = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential;

      return { data: assertion, response: assertion.response as AuthenticatorAssertionResponse, error: null }

    } catch (e) {
      logger.error(PASSKEY_ERRORS.UNABLE_TO_RETRIEVE_CREDENTIAL, e);
      return { data: null, response: null, error: PASSKEY_ERRORS.UNABLE_TO_RETRIEVE_CREDENTIAL };
    }
  }

  // @TODO: Replace static calls for outside of class utilities
  static credentialRawIdAsBase64({ credential }: { credential: PublicKeyCredential}): PasskeyRawIdResponse {
    if (!credential) {
      return { data: null, error: PASSKEY_ERRORS.CREDENTIAL_NOT_CREATED };
    }
    try {
      const rawIdStr = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
      return { data: rawIdStr, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.ERROR_RETRIEVING_RAW_ID, e);
      return { data: null, error: PASSKEY_ERRORS.ERROR_RETRIEVING_RAW_ID }
    }
  }

  static publicKeyCredentialCreationOptions(appName: string, username: string, email?: string): PublicKeyCredentialCreationOptions {
    return {
      challenge: new Uint8Array(16),
      rp: {
        name: appName,
      },
      user: {
        id: new Uint8Array(16),
        name: email ? email : username,
        displayName: username,
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
      ],
      timeout: 60000,
      attestation: "direct",
    }
  };
  
  static buf2hex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }
}