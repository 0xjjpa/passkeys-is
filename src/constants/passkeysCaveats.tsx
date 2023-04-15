import { CiLock, CiNoWaitingSign, CiSquareQuestion } from 'react-icons/ci';
import { PasskeyCode } from "../components/PasskeyCode";

export const PASSKEYS_CAVEATS = [
  {
    heading: 'Secure context',
    icon: CiLock,
    content: <>As with many cryptographic related applications, Passkeys will not be available in insecure contexts. This means that Passkeys will not be available in <PasskeyCode>HTTP</PasskeyCode> contexts, but will be available in <PasskeyCode>HTTPS</PasskeyCode> contexts. This includes <PasskeyCode>localhost</PasskeyCode>, which is not considered a secure context.</>
  },
  {
    heading: 'Rejected creation',
    icon: CiNoWaitingSign,
    content: <>Although an application can prompt the creation of a Passkey, it's ultimately up to the user to accept its creation. A rejection to do so will throw an `NotAllowedError` Error, which needs to be escaped to avoid bubbling up the exception.</>
  },
  {
    heading: 'Username vs Display Name',
    icon: CiSquareQuestion,
    content: <>Most authenticators will use the <PasskeyCode>name</PasskeyCode> property when prompting interacting with the <PasskeyCode>navigator.credentials</PasskeyCode> interface. However, <PasskeyCode>navigator.credentials.create</PasskeyCode> takes both <PasskeyCode>name</PasskeyCode> (usually an <PasskeyCode>email</PasskeyCode> or <PasskeyCode>username</PasskeyCode>) and <PasskeyCode>displayName</PasskeyCode> as variables. It is not very evident what are the differences between both and (or when, actually) to use or change which one.</>
  }
]