# ts-iden3-light-wallet
**iden3 light wallet client** library implementation in Typescript.


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