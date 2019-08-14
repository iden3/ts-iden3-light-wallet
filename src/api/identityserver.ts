import axios from "axios";

import * as iden3 from "../../../iden3js/lib/";

export interface Claim {
}
export type BabyJubPubK = string;

export class Provider {
    type: string; // "local", "remote"
    params: {}; // if "remote" => "url", "auth", ...
    constructor(type: string, params: {}) {
        this.type = type;
        this.params = params;
    }
    async newIdentity(kOp: BabyJubPubK, genesisExtraClaims: Claim[]): Promise<Identity> {
        // build ClaimAuthKOp
        let claimAuthKOp = new iden3.claim.AuthorizeKSignBabyJub(kOp);
        const data = {
            claimAuthKOp: claimAuthKOp.toEntry().toHex(),
            extraGenesisClaims: genesisExtraClaims
        }
        // send data to IdentityServer
        try {
            let res = await axios.post(
                this.params["url"] + "/identity",
                data
            )
            const identity = new Identity(this, res.data.id);
            return identity;
        }
        catch (err) {
            console.error("error:", err);
        }
    }

    loadIdentity(id: string): Identity {
        const identity = new Identity(this, id);
        return identity;
    }
}

export class Identity {
    provider: Provider;
    id: string;
    constructor(provider: Provider, id: string) {
        this.provider = provider;
        this.id = id;
    }
    async addClaim(claim: any) {
        // TODO once the iden3js is converted to Typescript (hopefully near future)
        // this kind of functions will require the Claim type, meanwhile we use 'any'
        const claimHex = claim.toEntry().toHex();
        // send data to IdentityServer
        try {
            let res = await axios.post(
                this.provider.params["url"] + "/id/" + this.id + "/claim",
                {claim: claimHex}
            )
            return res;
        }
        catch (err) {
            return err.response;
        }
    }
    async addClaims(claims: any[]) {
        let claimsHex = [];
        for(let i=0; i<claims.length; i++) {
            const claimHex = claims[i].toEntry().toHex();
            claimsHex.push(claimHex);
        }
        // send data to IdentityServer
        try {
            let res = await axios.post(
                this.provider.params["url"] + "/id/" + this.id + "/claims",
                {claims: claimsHex}
            )
            return res;
        }
        catch (err) {
            return err.response;
        }
    }
}