const path = require("path");
const UserService = require("../app/client");
const { PactV3 } = require("@pact-foundation/pact");
const {
  NEW_USER,
  EXPECTED_BODY_CREATE,
  EXPECTED_BODY_GET,
  EXPECTED_BODY_GET_ALL,
  BODY_UPDATE,
  EXPECTED_BODY_UPDATE,
} = require("./testConstants");

describe("Test", () => {
  // pact mock server url
  const mock_port = 1234;
  const mock_server_url = "http://127.0.0.1:" + mock_port;
  // Create a Mock Server
  const provider = new PactV3({
    consumer: "users_frontend",
    provider: "users_api",
    port: mock_port,
    dir: path.resolve(process.cwd(), "tests", "pacts"),
    logLevel: "DEBUG",
  });

  // Create a user
  it("test: create a user", () => {
    // interaction
      provider.addInteraction({
        state: "Users exist",
        uponReceiving: "a POST request to create a user",
        withRequest: { // The HTTP request information
          method: "POST",
          path: "/",
          body: NEW_USER,
        },
        willRespondWith: {// The HTTP response details
          status: 201,
          headers: { "Content-Type": "application/json" },
          body: EXPECTED_BODY_CREATE,
        },
      });

    return provider.executeTest(() => { // Executes a user defined function that should make the HTTP request that is being tested
      const users = new UserService(mock_server_url);
      return users.createUser(NEW_USER).then((response) => {
        expect(response).toEqual(EXPECTED_BODY_CREATE);
      });
    });
  });

  // Fetch all users
  it("test: fetch all users", () => {
    // interaction
    provider
      // Set up expected request
      .uponReceiving("a GET request to get all users")
      .withRequest({
        method: "GET",
        path: "/",
      })
      // Set up expected response
      .willRespondWith({
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: EXPECTED_BODY_GET_ALL,
      });

    // Verify request
    return provider.executeTest(() => {
      // Make request to the mock server
      const users = new UserService(mock_server_url);
      return users.getAllUsers().then((response) => {
        // Verify response
        expect(response).toEqual(EXPECTED_BODY_GET_ALL);
      });
    });
  });

  // Fetch single user
  it("test: fetch a single user", () => {
    // interaction
    provider
      .uponReceiving("a GET request to get a single user")
      .withRequest({
        method: "GET",
        path: "/2",
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY_GET,
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.getUser(2).then((response) => {
        expect(response).toEqual(EXPECTED_BODY_GET);
      });
    });
  });

  // Update a user
  it("test: update a user", () => {
    // interaction
    provider
      .uponReceiving("a PUT request to update a user")
      .withRequest({
        method: "PUT",
        path: "/3",
        body: BODY_UPDATE,
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: EXPECTED_BODY_UPDATE,
      });

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.updateUser(BODY_UPDATE).then((response) => {
        expect(response).toEqual(EXPECTED_BODY_UPDATE);
      });
    });
  });

  // Delete a user
  it("test: delete a user", () => {
    // interaction
    provider
      .uponReceiving("a DELETE request to delete a user")
      .withRequest({
        method: "DELETE",
        path: "/3",
      })
      .willRespondWith({
        status: 200,
        headers: {"Content-Type": ["application/json; charset=utf-8"]},
        body: {
          message: "Entity with id 3 was successfully removed.",
        },
      });
      

    return provider.executeTest(() => {
      const users = new UserService(mock_server_url);
      return users.deleteUser(3).then((response) => {
        expect(response).toEqual({
          message: "Entity with id 3 was successfully removed.",
        });
      });
    });
  });
});
