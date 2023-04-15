import { CiLock, CiNoWaitingSign } from 'react-icons/ci';
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
  }
]