# ts-iden3-light-wallet
**iden3 light wallet client** library implementation in Typescript for browser wallets.


## Dev
- first of all install typescript
```
> npm install -g typescript
```

- install dependencies
```
npm install
```

- for initial development, use local [iden3js](https://github.com/iden3/iden3js). Place it in the parent directory:
```
/
    /iden3js
    /ts-iden3-light-wallet
        /src
        /test
        ...
```

- this library connects with the [IdenityServer](https://github.com/iden3/go-iden3-servers), so will need a running IdentityServer

## Test
```
npm test
```


## Usage

```js
const provider = new Provider("remote", {"url": identityserverUrl});
const kOp = "0x117f0a278b32db7380b078cdb451b509a2ed591664d1bac464e8c35a90646796";

const identity = await provider.newIdentity(kOp, null);

console.log(identity.id);
// "119h9u2nXbtg5TmPsMm8W5bDkmVZhdS6TgKMvNWPU3"

const claim = new iden3.claim.AuthorizeEthKey("0xe0fbce58cfaa72812103f003adce3f284fe5fc7c", iden3.claim.ETH_KEY_TYPE.UPGRADE);
const res = await identity.addClaim(claim);
// res.status == "200"

// [WIP]
```
