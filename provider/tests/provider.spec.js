// const { Verifier } = require("@pact-foundation/pact");
// const path = require("path");
// const { loadData, app } = require("../provider");

// // // Set up a server to run the consumer tests against
// const server = app.listen(5000, () => {
//   loadData();
//   console.log("Users API listening on port 5000");
// });

// const usersExistState = () => {
//   return Promise.resolve("Users exist");
// };

// jest.setTimeout(10000); // Increase timeout to 10 seconds for all tests in this file

// describe("Pact Verification", () => {
//   it("verifies the provider", async () => {
//     // Verification Options
//     const options = {
//       // Required
//       provider: "usersInteractionsProvider", // Name of the provider if fetching from a Broker
//       providerBaseUrl: "http://localhost:5000/users", // Running API provider host endpoint.
//       disableSSLVerification: true,
//       logLevel: "DEBUG",
//       // Array of local pact file paths or HTTP-based URLs. Required if not using a Pact Broker.
//       pactUrls: [
//         path.resolve(
//           process.cwd(),
//           "../consumer/tests/pacts/users_frontend-users_api.json"
//         ),
//       ],

//       // ------   Fetch pacts from broker ----------  //
//       pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
//       pactBrokerToken: process.env.PACT_BROKER_TOKEN,

//       // ------   Publish verification results to broker -------  //
//       publishVerificationResult: true, //recommended to only publish from CI by setting the value to `process.env.CI === 'true'`
//       providerVersion: process.env.MY_CI_COMMIT, //recommended to be the git sha eg. process.env.MY_CI_COMMIT
//       providerVersionBranch: "main", //recommended to be the git branch eg. process.env.MY_CI_BRANCH
//       providerVersionTags: [process.env.MY_CI_BRANCH], //optional, recommended to be the git branch eg. process.env.MY_CI_BRANCH

//       // State Handlers
//       stateHandlers: {
//         "": () => {}, // This is the default state handler, it is used if one is not specified for the given state
//         "Users exist": usersExistState, // This is the state handler for the 'users exist' state
//       },

//       // Before and After Hooks
//       // These functions are called before and after verification begins
//       beforeEach: () => {
//         console.log("Starting Pact Verification");
//       },

//       afterEach: () => {
//         console.log("Pact Verification Complete!");
//       },

//       // Request Filters
//       requestFilter: (req, res, next) => {
//         // This function can be used to modify the request before it is sent to the provider
//         // e.g. add authentication headers, strip out sensitive data
//         console.log("I run before each request");
//         next();
//       },
//     };
//     // Verify the provider with the pact file then stop the server
//     const verifier = new Verifier(options);

//     await verifier.verifyProvider(); // Throws an error if verification fails


//     try {
//       await verifier.verifyProvider(); // Throws an error if verification fails
//     } finally {
//       server.close();
//     }
//   });
// });


const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const { loadData, app } = require("../provider");

describe("Pact Verification", () => {
  let server;

  const usersExistState = () => {
  return Promise.resolve("Users exist");
};

  beforeAll(done => {
    // Start the server before all tests run
    server = app.listen(5000, () => {
      loadData();
      console.log("Users API listening on port 5000");
      done();
    });
  });

  afterAll(done => {
    // Close the server after all tests have run
    server.close(() => {
      console.log("Server closed after Pact verification");
      done();
    });
  });

  it("verifies the provider", async () => {
    const options = {
      provider: "usersInteractionsProvider",
      providerBaseUrl: "http://localhost:5000/users",
      disableSSLVerification: true,
      logLevel: "DEBUG",
      pactUrls: [
        path.resolve(
          process.cwd(),
          "../consumer/tests/pacts/users_frontend-users_api.json"
        ),
      ],

      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: true,
      providerVersion: process.env.MY_GIT_SHA,
      providerVersionBranch: "main",
      providerVersionTags: [process.env.MY_CI_BRANCH],

      stateHandlers: {
        "Users exist": usersExistState,
      },
      // beforeEach: () => console.log("Starting Pact Verification"),
      // afterEach: () => console.log("Pact Verification Complete!"),
      requestFilter: (req, res, next) => {
        console.log("I run before each request");
        next();
      },
    };

    await new Verifier(options).verifyProvider();
  });
});
