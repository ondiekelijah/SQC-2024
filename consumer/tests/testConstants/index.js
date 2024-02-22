const NEW_USER = {
  id: 4,
  name: "Mikey Mouse",
  email: "mikey@example.com",
  age: 22,
  gender: "Male",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  phone: "555-555-5555",
  company: "Meta Inc.",
};

const EXPECTED_BODY_CREATE = {
  message: "Entity with id 3 was successfully inserted",
  status: "success",
  user: {
    address: {
      city: "New York",
      country: "USA",
      state: "NY",
      street: "123 Main St",
      zip: "10001",
    },
    age: 22,
    company: "Meta Inc.",
    email: "mikey@example.com",
    gender: "Male",
    id: 3,
    name: "Mikey Mouse",
    phone: "555-555-5555",
  },
};

const EXPECTED_BODY_GET = {
  status: "success",
  message: "Entity with id 2 successfully retrieved",
  entity: {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    age: 28,
    gender: "Female",
    address: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "555-555-1234",
    company: "XYZ Corp.",
  },
};

const EXPECTED_BODY_GET_ALL = {
  status: "success",
  message: "Entities successfully retrieved",
  entities: [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      age: 35,
      gender: "Male",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      phone: "555-555-5555",
      company: "Acme Inc.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      age: 28,
      gender: "Female",
      address: {
        street: "456 Oak St",
        city: "Los Angeles",
        state: "CA",
        zip: "90001",
        country: "USA",
      },
      phone: "555-555-1234",
      company: "XYZ Corp.",
    },
  ],
};

const BODY_UPDATE = {
  id: 3,
  name: "Mr Bob Johnson",
  email: "bob@gmail.com",
  age: 28,
  gender: "Female",
  address: {
    street: "456 Oak St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
  },
  phone: "555-555-1234",
  company: "XYZ Corp.",
};

const EXPECTED_BODY_UPDATE = {
  status: "success",
  message: "Entity with id 3 was successfully updated",
  user: {
    id: "3",
    name: "Mr Bob Johnson",
    email: "bob@gmail.com",
    age: 28,
    gender: "Female",
    address: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "555-555-1234",
    company: "XYZ Corp.",
  },
};

module.exports = {
  NEW_USER,
  EXPECTED_BODY_CREATE,
  EXPECTED_BODY_GET,
  EXPECTED_BODY_GET_ALL,
  BODY_UPDATE,
  EXPECTED_BODY_UPDATE,
};
