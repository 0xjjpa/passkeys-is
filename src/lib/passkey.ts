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

  static getPublicKeyFromAttestationResponse({ response }: { response: AuthenticatorAttestationResponse }) {
    if (!response) {
      return { data: null, error: PASSKEY_ERRORS.INVALID_CREDENTIAL_RESPONSE };
    }
    try {
      const publicKey = response.getPublicKey();
      const publicKeyAsHex = Passkey.buf2hex(publicKey);
      logger.debug('(🪪,ℹ️) Public Key as Hex', publicKeyAsHex);
      return { data: publicKey, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.CREDENTIAL_RESPONSE_HAS_NO_PUBLIC_KEY, e);
      return { data: null, error: PASSKEY_ERRORS.CREDENTIAL_RESPONSE_HAS_NO_PUBLIC_KEY }
    }
  }

  static async create({ appName, username, email, yubikeyOnly }: { appName: string, username: string, email?: string, yubikeyOnly?: boolean }): Promise<PasskeyCredentialResponse> {
    logger.debug('(🪪,ℹ️) Creating credential');
    try {
      if (!navigator.credentials) {
        return { data: null, response: null, error: PASSKEY_ERRORS.BROWSER_DOES_NOT_SUPPORT_PASSKEY }
      }

      const credential = (await navigator.credentials.create({
        publicKey: Passkey.publicKeyCredentialCreationOptions(appName, username, email, yubikeyOnly),
      })) as PublicKeyCredential;

      this._createdCredential = credential;
      return { data: credential, response: credential.response as AuthenticatorAttestationResponse, error: null };
    } catch (e) {
      logger.error(PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL, e);
      return { data: null, response: null, error: PASSKEY_ERRORS.USER_REJECTED_CREDENTIAL };
    }
  }

  static async get({ allowCredentials = [] }: { allowCredentials?: PublicKeyCredentialDescriptor[] }): Promise<PasskeyCredentialResponse> {
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
  static credentialRawIdAsBase64({ credential }: { credential: PublicKeyCredential }): PasskeyRawIdResponse {
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

  // NB: This is the easiest way to parse the DER format from the getPublicKey method given the webauthn
  // navigator.credentials.create({ ... }).response object. Do not try to mess with CBOR against this
  // ArrayBuffer directly, as it does not have enough data to be parsed properly via CBOR.
  static importPublicKeyAsCryptoKey = async (publicKey: ArrayBuffer): Promise<CryptoKey | null> => {
    logger.debug('(🔑,ℹ️) Parsing webauthn response public key as CryptoKey via Web Crypto API');
    try {
      const key = await crypto.subtle.importKey(
        // The getPublicKey() operation thus returns the credential public key as a SubjectPublicKeyInfo. See:
        // https://w3c.github.io/webauthn/#sctn-public-key-easy
        // crypto.subtle can import the spki format:
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
        "spki", // "spki" Simple Public Key Infrastructure rfc2692
        publicKey,
        {
          // these are the algorithm options
          // await cred.response.getPublicKeyAlgorithm() // returns -7
          // -7 is ES256 with P-256 // search -7 in https://w3c.github.io/webauthn
          // the W3C webcrypto docs:
          // https://www.w3.org/TR/WebCryptoAPI/#informative-references (scroll down a bit)
          // ES256 corrisponds with the following AlgorithmIdentifier:
          name: "ECDSA",
          namedCurve: "P-256",
          hash: { name: "SHA-256" }
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["verify"] //"verify" for public key import, "sign" for private key imports
      );
      return key;
    } catch (e) {
      logger.error(PASSKEY_ERRORS.PUBLIC_KEY_CANT_BE_PARSED_AS_CRYPTO_KEY, e);
      return null;
    }
  }

  static publicKeyCredentialCreationOptions(appName: string, username: string, email?: string, yubikeyOnly?: boolean): PublicKeyCredentialCreationOptions {
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
      ...(yubikeyOnly && {
        authenticatorSelection: {
          authenticatorAttachment: 'cross-platform',
        }
      })
    }
  };

  static buf2hex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }
}