export enum PASSKEY_ERRORS {
    USER_REJECTED_CREDENTIAL = 'The user rejected the creation of the Passkey, likely due to canceling the prompt.',
    UNABLE_TO_RETRIEVE_CREDENTIAL = 'The get request failed, either due to lack of credentials in device or user cancelling action.',
    BROWSER_DOES_NOT_SUPPORT_PASSKEY = 'The browser does not support Passkey, or the context does not expose it (e.g. a non-HTTPS page).',
    CREDENTIAL_NOT_CREATED = 'The credential has not been created yet.',
    ERROR_RETRIEVING_RAW_ID = 'There was an error retrieving the rawId from the credential.',
    INVALID_CREDENTIAL_RESPONSE = 'The provided response is not a valid response object from a get or create call',
    CREDENTIAL_RESPONSE_HAS_NO_PUBLIC_KEY = 'The provided response is not an attestation response and has no public key',
    PUBLIC_KEY_CANT_BE_PARSED_AS_CRYPTO_KEY = 'Unable to load key, the provided ArrayBuffer isn’t a valid key.'
}

