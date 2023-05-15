export const PASSKEYS_CAVEATS = [
  {
    id: 'available-outside-secure-context',
    heading: 'Secure context',
    description: 'Passkeys will not work in localhost',
    content: `As with many cryptographic related applications, Passkeys will not be available in insecure contexts. This means that Passkeys will not be available in <code>HTTP</code> contexts, but will be available in <code>HTTPS</code> contexts. This includes <code>localhost</code>, which is not considered a secure context.`
  },
  {
    id: 'automatic-and-can-be-rejected',
    heading: 'Rejected creation',
    description: 'Passkeys can always be rejected',
    content: `Although an application can prompt the creation of a Passkey, it's ultimately up to the user to accept its creation. A rejection to do so will throw an 'NotAllowedError' Error, which needs to be escaped to avoid bubbling up the exception.`
  },
  {
    id: 'clear-when-needs-username-and-when-display-name',
    heading: 'Username vs Display Name',
    description: 'It is unclear when to use which',
    content: `Most authenticators will use the <code>name</code> property when prompting interacting with the <code>navigator.credentials</code> interface. However, <code>navigator.credentials.create</code> takes both <code>name</code> (usually an <code>email</code> or <code>username</code>) and <code>displayName</code> as variables. It is not very evident what are the differences between both and (or when, actually) to use or change which one.`
  },
  {
    id: 'able-to-show-available-passkeys',
    heading: 'Available Passkeys',
    description: 'It is not possible to see what Passkeys user has',
    content: `Passkeys relies on <code>navigator.credentials.get</code> to obtain a specific Passkey to load in the application. However, there’s no way for the website trying to authenticate your Passkey to access the ones you currently have available.`
  },
  {
    id: 'consistent-with-rawId-vs-id',
    title: 'Length of rawId and id',
    heading: `Length of <code>rawId</code> and <code>id</code>`,
    description: 'Passkeys’s properties rawId and id aren’t consistent',
    content: `Passkeys have a <code>id</code> property equal to their <code>rawId</code> value (an <code>ArrayBuffer</code>) encoded in <code>base64</code>. However, the <code>id</code> property will remove the padding of the value (i.e. the <code>=</code> character), making it <i>sometimes</i> a different length than if you were to encode the <code>rawId</code> in <code>bas64</code> yourself. Both values are valid <code>base64</code> encoded strings (i.e., decoders will understand them) but ideally default to using <code>id</code> to avoid these length discrepancies.`
  },
  {
    id: 'clear-when-throwing-errors',
    heading: 'Creating credentials might throw an error',
    description: 'Passkeys calls are error-prone',
    content: `Despite what would be correct code, the <code>navigator.credentials.create</code> code might throw an error with a <code>Request cancelled by user</code> independently on whether the user accepted or rejected the request.`
  },
  {
    id: 'context-aware-when-called',
    heading: 'Calling code from client side creates a key',
    description: 'Passkeys can be created from the dev tools pane',
    content: `If you provide a correct <code>navigator.credentials.create</code> code via the Developers Toolbar, you can trigger the <code>webauthn</code> workflow. The key will be then created in the client's Passkey storage. If this action was executed in <code>localhost</code> and there was a key already in that domain, it will be replaced. However, in any other domain, even if the <code>rp</code> property matches, it will not overwrite the existing one but create a new one instead.`
  },
  {
    id: 'really-supporting-p-384',
    title: 'Support for p-384 keys is non-existent',
    heading: 'Support for <code>p-384</code> keys is non-existent',
    description: 'Passkeys don’t really support other keys other than p-256',
    content: `Despite documentation describing support for <code>p-384</code> curves by using <code>-35</code> as a <code>pubKeyCredParams</code> instead of the standard <code>-7</code> as part of the <code>PublicKeyCredentialCreationOptions</code> object, no platform ID seems to be fully supporting this curve.`
  }
]