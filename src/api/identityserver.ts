import axios from 'axios';

import * as iden3 from '../../../iden3js/lib/';

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
            claimAuthKOp: (claimAuthKOp.toEntry()).toHex(),
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
        // TODO
        const identity = new Identity(this, "todo");
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
    addClaim(claim: Claim) {
        // TODO

    }
}