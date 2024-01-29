module.exports = {
  bail: true, //Pausa os testes no momento em que uma falha é apresentada
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js",
    // src/qualquer pasta(**)/qualquer arquivo(*).spec.js
    // o "<rootDir/src>" ajuda ignorar o teste em pastas de config, como a "node_modules"
  ],
};
