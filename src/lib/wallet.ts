import { ec as EC } from 'elliptic';
import { Passkey } from './passkey';

class Wallet {
  private publicKey: CryptoKey;
  public address: string;

  constructor(publicKey: CryptoKey) {
    this.publicKey = publicKey;
  }

  public async getAddress() {
    let jwkKey;
    try {
      jwkKey = await window.crypto.subtle.exportKey('jwk', this.publicKey);
    } catch (err) {
      console.error('Failed to export key:', err);
      return;
    }
    if (jwkKey) {
      let curve = new EC('p256');
      let key = curve.keyFromPublic({
        x: jwkKey.x,
        y: jwkKey.y,
      }, 'hex');

      console.log("(🔑,ℹ️) X Point Public Key", jwkKey.x);
      console.log("(🔑,ℹ️) Y Point Public Key", jwkKey.y);

      const x = key.getPublic().getX();
      const y = key.getPublic().getY();

      // Now you can use 'key' with 'elliptic' methods
      // Concatenate the `x` and `y` coordinates as a byte array
      // Convert the `x` and `y` coordinates to Uint8Arrays
      const xArray = new Uint8Array(x.toArray('be', 32));
      const yArray = new Uint8Array(y.toArray('be', 32));

      const publicKeyBytes = this.concatenateUint8Arrays(xArray, yArray);

      // Hash the byte array using a cryptographic hash function (e.g., SHA256)
      const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", publicKeyBytes));

      // Take the first 20 bytes of the hash result
      const addressBytes = hash.slice(0, 20);

      // Convert the 20-byte hash into a hexadecimal string
      const addressHex = Passkey.buf2hex(addressBytes);
      this.address = addressHex;
      return this.address;
    }
  }


  public concatenateUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    const totalLength = arrays.reduce((length, array) => length + array.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    return result;
  }
}

export { Wallet };
