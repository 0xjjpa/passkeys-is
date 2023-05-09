import { CiAlignCenterV, CiBoxList, CiCircleRemove, CiLock, CiNoWaitingSign, CiSquareQuestion } from 'react-icons/ci';
import { PasskeyCode } from "../components/PasskeyCode";
import { Tag } from '@chakra-ui/react';

export const PASSKEYS_CAVEATS = [
  {
    id: 'secure-context',
    heading: 'Secure context',
    icon: CiLock,
    content: <>As with many cryptographic related applications, Passkeys will not be available in insecure contexts. This means that Passkeys will not be available in <PasskeyCode>HTTP</PasskeyCode> contexts, but will be available in <PasskeyCode>HTTPS</PasskeyCode> contexts. This includes <PasskeyCode>localhost</PasskeyCode>, which is not considered a secure context.</>
  },
  {
    id: 'rejected-creation',
    heading: 'Rejected creation',
    icon: CiNoWaitingSign,
    content: <>Although an application can prompt the creation of a Passkey, it's ultimately up to the user to accept its creation. A rejection to do so will throw an `NotAllowedError` Error, which needs to be escaped to avoid bubbling up the exception.</>
  },
  {
    id: 'username-vs-display-name',
    heading: 'Username vs Display Name',
    icon: CiSquareQuestion,
    content: <>Most authenticators will use the <PasskeyCode>name</PasskeyCode> property when prompting interacting with the <PasskeyCode>navigator.credentials</PasskeyCode> interface. However, <PasskeyCode>navigator.credentials.create</PasskeyCode> takes both <PasskeyCode>name</PasskeyCode> (usually an <PasskeyCode>email</PasskeyCode> or <PasskeyCode>username</PasskeyCode>) and <PasskeyCode>displayName</PasskeyCode> as variables. It is not very evident what are the differences between both and (or when, actually) to use or change which one.</>
  },
  {
    id: 'available-passkeys',
    heading: <>Available Passkeys <Tag size="sm" colorScheme='green'>New</Tag></>,
    icon: CiBoxList,
    content: <>Passkeys relies on <PasskeyCode>navigator.credentials.get</PasskeyCode> to obtain a specific Passkey to load in the application. However, there’s no way for the website trying to authenticate your Passkey to access the ones you currently have available.</>
  },
  {
    id: 'rawId-vs-id',
    heading: <>Length of <PasskeyCode>rawId</PasskeyCode> and <PasskeyCode>id</PasskeyCode> <Tag size="sm" colorScheme='green'>New</Tag></>,
    icon: CiAlignCenterV,
    content: <>Passkeys have a <PasskeyCode>id</PasskeyCode> property equal to their <PasskeyCode>rawId</PasskeyCode> value (an <PasskeyCode>ArrayBuffer</PasskeyCode>) encoded in <PasskeyCode>base64</PasskeyCode>. However, the <PasskeyCode>id</PasskeyCode> property will remove the padding of the value (i.e. the <PasskeyCode>=</PasskeyCode> character), making it <i>sometimes</i> a different length than if you were to encode the <PasskeyCode>rawId</PasskeyCode> in <PasskeyCode>bas64</PasskeyCode> yourself. Both values are valid <PasskeyCode>base64</PasskeyCode> encoded strings (i.e., decoders will understand them) but ideally default to using <PasskeyCode>id</PasskeyCode> to avoid these length discrepancies.</>
  },
  {
    id: 'random-errors',
    heading: <>Creating credentials might throw an error <Tag size="sm" colorScheme='yellow'>Untested</Tag></>,
    icon: CiCircleRemove,
    content: <>Despite what would be correct code, the <PasskeyCode>navigator.credentials.create</PasskeyCode> code might throw an error with a <PasskeyCode>Request cancelled by user</PasskeyCode> independently on whether the user accepted or rejected the request.</>
  },
  {
    id: 'client-code',
    heading: <>Calling code from client side creates a key<Tag size="sm" colorScheme='yellow'>Untested</Tag></>,
    icon: CiCircleRemove,
    content: <>If you provide a correct <PasskeyCode>navigator.credentials.create</PasskeyCode> code via the Developers Toolbar, you can trigger the <PasskeyCode>webauthn</PasskeyCode> workflow. The key will be then created in the client's Passkey storage. If this action was executed in <PasskeyCode>localhost</PasskeyCode> and there was a key already in that domain, it will be replaced. However, in any other domain, even if the <PasskeyCode>rp</PasskeyCode> property matches, it will not overwrite the existing one but create a new one instead.</>
  },
  {
    id: 'p-384-support',
    heading: <>Support for <PasskeyCode>p-384</PasskeyCode> keys is non-existent <Tag size="sm" colorScheme='green'>New</Tag></>,
    icon: CiCircleRemove,
    content: <>Despite documentation describing support for <PasskeyCode>p-384</PasskeyCode> curves by using <PasskeyCode>-35</PasskeyCode> as a <PasskeyCode>pubKeyCredParams</PasskeyCode> instead of the standard <PasskeyCode>-7</PasskeyCode> as part of the <PasskeyCode>PublicKeyCredentialCreationOptions</PasskeyCode> object, no platform ID seems to be fully supporting this curve.</>
  }
]