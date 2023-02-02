![image](https://user-images.githubusercontent.com/65929678/216216243-440bcb5c-5052-4946-9cad-47a98842e363.png)

# APTOPLAY Tutorial Server

> Effortless Integration, Seamless Experience in Aptos gaming solutions for game builders

The problem we aim to solve is the effortless integration of blockchain technology into gaming. Game developers are often unable
to take full advantage of the benefits that blockchain technology offers due to the complex and unfriendly solutions that currently exist.
This has resulted in a barrier for many game developers and has limited the potential for Web3 games. Additionally, the tools
that currently exist for game developers are often lacking and do not provide a user-friendly experience.

```bash
$ npm install aptoplay-core
```

This web server is a demo that provides tutorials and information about the `aptoplay-core` library used by Aptoplay. Through this demo, users can learn about the following:

- Installation and configuration of `aptoplay`
- Interaction with `PlayFab`
- Use cases through interaction with the Aptos chain.

The goal of this server is to provide a better developer experience (DX) for the integration of Aptos-Gaming, and more features will be added through ongoing updates.

If you encounter any bugs or areas that need improvement about server, please [create an issue](https://github.com/catze-labs/aptoplay-server/issues/new). We will do our best to assist with your issue reporting.

## Libraries used in this demo

- Nest.js : `9.x`
- Prisma : `4.9.x`
- Axios
- aptoplay-core : `latest`

## File Structures `/src` in this demo

```
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── constants.ts
├── env.d.ts
├── main.ts
├── routes
│   ├── auth
│   │   ├── auth.controller.ts
│   │   └── dtos.ts
│   ├── nft
│   │   ├── dtos.ts
│   │   └── nft.controller.ts
│   ├── routes.module.ts
│   ├── schema.ts
│   └── user
│       └── user.controller.ts
├── services
│   ├── aptoplay
│   │   └── aptoplay.service.ts
│   ├── aptos
│   │   └── aptos.service.ts
│   ├── auth
│   │   └── auth.service.ts
│   ├── nft
│   │   └── nft.service.ts
│   ├── prisma
│   │   └── prisma.service.ts
│   └── services.module.ts
├── types.ts
└── utils.ts


```
