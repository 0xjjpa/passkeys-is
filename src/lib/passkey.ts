export class Passkey {
  static _createdCredential: PublicKeyCredential;

  static publicKeyCredentialCreationOptions(appName: string, username: string): PublicKeyCredentialCreationOptions {
    return {
      challenge: new Uint8Array(16),
      rp: {
        name: appName,
      },
      user: {
        id: new Uint8Array(16),
        name: username,
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

  static async create({ appName, username }: { appName: string, username: string }) {
    const credential = (await navigator.credentials.create({
      publicKey: Passkey.publicKeyCredentialCreationOptions(appName, username),
    })) as PublicKeyCredential;

    this._createdCredential = credential;
  }
}