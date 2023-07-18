export const PASSKEYS_CAVEATS = [
  {
    id: 'available-outside-secure-context',
    heading: 'Secure context',
    description: 'Passkeys will not work in localhost.',
    content: `As with many cryptographic related applications, Passkeys will not be available in insecure contexts. This means that Passkeys will not be available in <code>HTTP</code> contexts, but will be available in <code>HTTPS</code> contexts. This includes <code>localhost</code>, which is not considered a secure context.`
  },
  {
    id: 'automatic-and-can-be-rejected',
    heading: 'Rejected creation',
    description: 'Passkeys can always be rejected.',
    content: `Although an application can prompt the creation of a Passkey, it's ultimately up to the user to accept its creation. A rejection to do so will throw an 'NotAllowedError' Error, which needs to be escaped to avoid bubbling up the exception.`
  },
  {
    id: 'clear-when-needs-username-and-when-display-name',
    heading: 'Username vs Display Name',
    description: 'It is unclear which property is displayed.',
    content: `Most authenticators will use the <code>name</code> property when prompting interacting with the <code>navigator.credentials</code> interface. However, <code>navigator.credentials.create</code> takes both <code>name</code> (usually an <code>email</code> or <code>username</code>) and <code>displayName</code> as variables. It is not very evident what are the differences between both and (or when, actually) to use or change which one.`
  },
  {
    id: 'able-to-show-available-passkeys',
    heading: 'Available Passkeys',
    description: 'It is not possible to see what Passkeys a user has.',
    content: `Passkeys relies on <code>navigator.credentials.get</code> to obtain a specific Passkey to load in the application. However, there’s no way for the website trying to authenticate your Passkey to access the ones you currently have available.`
  },
  {
    id: 'consistent-with-rawId-vs-id',
    title: 'Length of rawId and id',
    heading: `Length of <code>rawId</code> and <code>id</code>`,
    description: 'Passkeys’s properties rawId and id aren’t consistent.',
    content: `Passkeys have a <code>id</code> property equal to their <code>rawId</code> value (an <code>ArrayBuffer</code>) encoded in <code>base64</code>. However, the <code>id</code> property will remove the padding of the value (i.e. the <code>=</code> character), making it <i>sometimes</i> a different length than if you were to encode the <code>rawId</code> in <code>bas64</code> yourself. Both values are valid <code>base64</code> encoded strings (i.e., decoders will understand them) but ideally default to using <code>id</code> to avoid these length discrepancies.`
  },
  {
    id: 'clear-when-throwing-errors',
    heading: 'Create workflow can err',
    description: 'Passkeys calls are error-prone, based on user input.',
    content: `Despite what would be correct code, the <code>navigator.credentials.create</code> code might throw an error with a <code>Request cancelled by user</code> independently on whether the user accepted or rejected the request.`
  },
  {
    id: 'context-aware-when-called',
    heading: 'Client side key creation',
    description: 'Passkeys can be created from the dev tools pane.',
    content: `If you provide a correct <code>navigator.credentials.create</code> code via the Developers Toolbar, you can trigger the <code>webauthn</code> workflow. The key will be then created in the client's Passkey storage. If this action was executed in <code>localhost</code> and there was a key already in that domain, it will be replaced. However, in any other domain, even if the <code>rp</code> property matches, it will not overwrite the existing one but create a new one instead.`
  },
  {
    id: 'really-supporting-p-384',
    title: 'Support for p-384 keys is non-existent',
    heading: 'No <code>p-384</code> keys support',
    description: 'Passkeys don’t support other keys other than p-256.',
    content: `Despite documentation describing support for <code>p-384</code> curves by using <code>-35</code> as a <code>pubKeyCredParams</code> instead of the standard <code>-7</code> as part of the <code>PublicKeyCredentialCreationOptions</code> object, no platform ID seems to be fully supporting this curve.`
  },
  {
    id: 'exposing-passkeys-public-keys-in-CBOR-format',
    heading: 'Public key in DER format',
    time: 1685365541536,
    description: 'Webauthn exports the public key in DER format.',
    content: `The easiest way to retrieve the public key of a user during the webauthn workflow is by calling <code>getPublicKey()</code> of the <code>response</code> object returned during the credential creation process. To ensure you have access to this object, cast the response with the type <code>AuthenticatorAttestationResponse</code>, otherwise the method won’t be available. Bear in mind this interface is only available during creation of the Passkey and not during retrieval (e.g. <code>get</code> call) of the credential, where an assertation against the server data is being created.<br/><br/>Finally, bear in mind that when using this method, the public key is returned in <b>DER</b> format, and not in <b>CBOR</b> format as it’s being retrieved from the <code>authenticatorData</code> payload. You can import and manipulate this key (originally an <code>ArrayBuffer</code>) as a <code>CryptoKey</code> using the Web Cryptographi API <code>crypto.subtle.importKey</code> method passing the <code>spki</code> format as parameter.`
  },
  {
    id: 'always-consistent-when-specifying-authenticators',
    heading: 'Authenticators setup',
    time: 1687331025809,
    description: 'Requests can force specific authenticators.',
    content: 'The property <code>authenticatorSelection</code> and its children <code>authenticatorAttachment</code> can determine a preference for a particular authenticator. If selected <code>cross-platform</code>, then the webauthn authentication catalog will only show support for roaming authenticators (e.g., <code>Yubikey</code>). At the same time, if selected <code>platform</code>, it will request only biometrics-supported authentication. By default (i.e., if the property is missing), no preference is given and thus, both options can be selected.<br/><br/>There are a couple of edge-cases where a platform authenticator can be toggled on and off (e.g., a keyboard with a fingerprint reader with FIDO2 support) and <code>platform</code> is preferred. If the only authenticator is this device, then the workflow will continue w/o even prompting signature using the previously loaded key before the authenticator was disconnected.'
  },
  {
    id: 'stored-only-locally-in-ios',
    heading: 'iCloud backups',
    time: 1689678796798,
    description: 'Passkeys in iCloud are by default backed up.',
    content: 'As a requirement to work with Passkeys in the Apple ecosystem, iCloud for Keychain needs to be enabled. As a result, Passkeys generated in an iOS device will be synced using Apple’s encrypted <code>HSM</code> setup that protects all user’s iCloud accounts. This means that other iOS devices sharing the same Apple ID will automatically sync this Passkey. In case of <code>10</code> failed Apple ID attempts to recover an iCloud account, as detailed by Apple’s Terms of Service, the account will be locked, and no further information, included Passkeys connected to this account, can be recovered.<br/></br>Passkeys can be backed up to a different Apple ID account using iOS’s Airdrop feature. Both users (sender and recipient) need to be in each other contacts’s list. After sending the Passkey, it will be available on the recipient’s phone via its traditional biometrics workflow. Although an iOS device can send a Passkey to a macOS device (e.g., macbook Air, macbook Pro), the latter can not make use of the Passkey, nor it is available via Keychain or Safari to log in to the website the Passkey was created in.'
  },
  {
    id: 'exposing-the-public-key-other-than-during-generation',
    heading: 'Passkeys’ Public Keys',
    time: 1689678796799,
    description: 'Public key is only available during generation',
    content: 'Although part of the Passkey information is provided as part of the "signing" or "attestation" process of the <code>Webauthn</code> workflow, the actual public key is <b>NOT</b> included in the response. The attestation includes a signature over the <code>clientDataJSON</code> and the <code>authenticatorData</code>, the latter including some information about the actual device used during the verification process. However, the public key data is only available during the registration part of the Webauthn workflow (i.e., the <code>navigator.credentials.create</code> call) and is not available to that particular Passkey anymore, not even during the <code>navigator.credentials.get</code> call.<br/></br/>To access a Passkey public key, you need to <code>await</code> for the response payload, and call the method <code>response.getPublicKey()</code>. Within TypeScript, you can cast the <code>response</code> of the <code>credential</code> as <code>AuthenticatorAttestationResponse</code> to have visibility of the <code>getPublicKey</code> method.'
  }
]