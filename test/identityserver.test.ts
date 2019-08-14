import "mocha" // using @types/mocha
import { expect } from "chai"

import { Provider } from "../src/api/identityserver"

import * as iden3 from "../../iden3js/lib/";

const identityserverUrl = "http://127.0.0.1:25000/api/unstable";

describe("IdeniityServer", () => {
    describe("newIdentity", () => {
        it("Should create a new identity using the IdentityServer", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const kOp = "0x117f0a278b32db7380b078cdb451b509a2ed591664d1bac464e8c35a90646796";

            const identity = await provider.newIdentity(kOp, null);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")
        })
    })
    describe("loadIdentity", () => {
        it("Should load an existing identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")
        })
    })
    describe("addClaim", () => {
        it("Should add a claim to the identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            const claim = new iden3.claim.AuthorizeEthKey("0xe0fbce58cfaa72812103f003adce3f284fe5fc7c", iden3.claim.ETH_KEY_TYPE.UPGRADE);
            const res = await identity.addClaim(claim);
            expect(res.status).to.be.equal(200);
        })
    })
    describe("addClaims", () => {
        it("Should add multiple claims to the identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            let claims = [];
            const claim0 = new iden3.claim.AuthorizeEthKey("0xE63731Dec52AED89500F5E54568486d0a3bC1C01", iden3.claim.ETH_KEY_TYPE.UPGRADE);
            claims.push(claim0);
            const claim1 = new iden3.claim.AuthorizeEthKey("0x3dD676ee48cFd74eb8803e4a9c7858E9799cDb46", iden3.claim.ETH_KEY_TYPE.UPGRADE);
            claims.push(claim1);
            const claim2 = new iden3.claim.AuthorizeEthKey("0xd6CF3a3407d51243328C63fAd7Fb231cC0d1003D", iden3.claim.ETH_KEY_TYPE.UPGRADE);
            claims.push(claim2);

            const res = await identity.addClaims(claims);
            expect(res.status).to.be.equal(200);
        })
    })
    describe("getAllReceivedClaims", () => {
        it("Should get all received claims from the identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            const res = await identity.getAllReceivedClaims();
            expect(res.status).to.be.equal(200);
            expect(res.data.receivedClaims).to.be.equal(null);
        })
    })
    describe("getAllEmittedClaims", () => {
        it("Should get all emitted claims from the identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            const res = await identity.getAllEmittedClaims();
            expect(res.status).to.be.equal(200);
            expect(res.data.emittedClaims.length).to.be.equal(5);
        })
    })
    describe("getAllClaims", () => {
        it("Should get all claims (emitted and received) from the identity", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            const res = await identity.getAllClaims();
            expect(res.status).to.be.equal(200);
            expect(res.data.emittedClaims.length).to.be.equal(5);
            expect(res.data.receivedClaims).to.be.equal(null);
        })
    })
    describe("getFullMT", () => {
        it("Should get the complete MerkleTree", async () => {
            const provider = new Provider("remote", {"url": identityserverUrl});
            const id = "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3";
            const identity = await provider.loadIdentity(id);
            expect(identity.id).to.equal("119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3")

            const res = await identity.getFullMT();
            expect(res.status).to.be.equal(200);
            const mt = res.data.mt;
            expect(mt["0x63757272656e74726f6f74"]).to.be.equal("0x030ab334f810092f25a057291dbd241275e170827af4214ab8278b6e138ac9c844");
        })
    })
})
