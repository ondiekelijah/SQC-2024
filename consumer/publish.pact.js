// const pact = require('@pact-foundation/pact-node');
// // if (!process.env.CI && !process.env.PUBLISH_PACT) {
// //     console.log("skipping Pact publish...");
// //     process.exit(0)
// // }

// const pactBrokerUrl = "https://mixandpix.pactflow.io";
// const pactBrokerToken = "4UGnkivqck9SgdwpjWI6-A";

// const gitHash = require('child_process')
//     .execSync('git rev-parse --short HEAD')
//     .toString().trim();

// const opts = {
//     pactFilesOrDirs: ['./tests/pacts/'],
//     pactBroker: pactBrokerUrl,
//     pactBrokerToken: pactBrokerToken,
//     tags: ['prod', 'test'],
//     consumerVersion: gitHash
// };

// pact
//     .publishPacts(opts)
//     .then(() => {
//         console.log('Pact contract publishing complete!');
//         console.log('');
//         console.log(`Head over to ${pactBrokerUrl}`);
//         console.log('to see your published contracts.')
//     })
//     .catch(e => {
//         console.log('Pact contract publishing failed: ', e)
//     });

const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: ['./tests/pacts/'],
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  tags: ["prod", "test"],
  consumerVersion: "1.0.0",
};
pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!");
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
