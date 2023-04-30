import { PASSKEY_ERRORS } from "../constants/errors";
import { logger } from "./logger";

export type PasskeyResponse = {
  data: PublicKeyCredential | null;
  error: string | null;
}

export type PasskeyRawIdResponse = {
  data: string | null;
  error: string | null;
}

export class Passkey {
  static _createdCredential: PublicKeyCredential;

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

  credentialRawIdAsBase64({ credential }: { credential: PublicKeyCredential}): PasskeyRawIdResponse {
    if (credential) {
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

  static async create({ appName, username, email }: { appName: string, username: string, email?: string }): Promise<PasskeyResponse> {
    logger.debug('(🪪,ℹ️) Creating credential');
    try {
      if (!navigator.credentials) {
        return { data: null, error: PASSKEY_ERRORS.BROWSER_DOES_NOT_SUPPORT_PASSKEY }
      }

      const credential = (await navigator.credentials.create({
        publicKey: Passkey.publicKeyCredentialCreationOptions(appName, username, email),
      })) as PublicKeyCredential;

      this._createdCredential = credential;
      return { data: credential, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL, e);
      return { data: null, error: PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL };
    }
  }

  static async get({ allowCredentials = [] }: { allowCredentials?: PublicKeyCredentialDescriptor[]}): Promise<PasskeyResponse> {
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

      return { data: assertion, error: null }

    } catch (e) {
      logger.error(PASSKEY_ERRORS.UNABLE_TO_RETRIEVE_CREDENTIAL, e);
      return { data: null, error: PASSKEY_ERRORS.UNABLE_TO_RETRIEVE_CREDENTIAL };
    }
  }
}