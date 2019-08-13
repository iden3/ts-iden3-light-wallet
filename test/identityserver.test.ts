import "mocha" // using @types/mocha
import { expect } from "chai"

import { Provider } from "../src/api/identityserver"

const identityserverUrl = "http://127.0.0.1:25000/api/unstable";

describe("IdentityServer", () => {
    describe("NewIdentity", () => {
        it("Should create a new identity using the IdentityServer", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const kOp = "0x117f0a278b32db7380b078cdb451b509a2ed591664d1bac464e8c35a90646796";

            const identity = await provider.newIdentity(kOp, null);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")
        })
    })
})
