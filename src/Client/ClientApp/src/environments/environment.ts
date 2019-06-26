// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
<<<<<<< HEAD
  production: true,
  authApi: 'https://localhost:5001/',
  walletApi: 'https://localhost:5002/',
  shoppingApi: 'https://localhost:5003/',
  contractAddress: '0x6429acbf2a15ef0119aa347b8da5a2dbb6056f29',
  adminAddress: '0x0B94369D5368acBB6674f11758Be01ae69CDc04f',
  // authApi: 'https://crypto-securityservice.azurewebsites.net/',
  // walletApi: 'https://crypto-walletservice.azurewebsites.net/',
  // shoppingApi: 'https://crypto-shoppingservice.azurewebsites.net/',
=======
  production: false,
  // authApi: 'https://localhost:5001/',
  // walletApi: 'https://localhost:5002/',
  // shoppingApi: 'https://localhost:5003/',
  contractAddress: '0xcdc915cf1a9ddd30e604112dd47b88d604c29075',
  adminAddress: '0xB6DB9AFF2b8436C748a528A41CeBE0E58c7fD075',
  authApi: 'https://crypto-securityservice.azurewebsites.net/',
  walletApi: 'https://crypto-walletservice.azurewebsites.net/',
  shoppingApi: 'https://crypto-shoppingservice.azurewebsites.net/',
>>>>>>> DEV
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
