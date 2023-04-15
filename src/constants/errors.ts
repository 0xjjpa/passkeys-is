export enum PASSKEY_ERRORS {
    USER_REJECTED_CREDENTIAL = 'The user rejected the creation of the Passkey, likely due to canceling the prompt.',
    BROWSER_DOES_NOT_SUPPORT_PASSKEY = 'The browser does not support Passkey, or the context does not expose it (e.g. a non-HTTPS page).',
}

