/**
 * User type matching DummyJSON's /users response shape.
 * @see https://dummyjson.com/docs/users
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  age: number;
  gender: string;
}

/** Response shape for GET /users */
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

/** Input for creating a new user via POST /users/add */
export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

/** Input for updating a user via PUT /users/:id */
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
}
