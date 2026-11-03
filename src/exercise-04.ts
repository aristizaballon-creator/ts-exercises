interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
    data: T;
    error: string | null;
}

const users: User[] = [
  { id: 1, name: "Ana", email: "ana@example.com" },
  { id: 2, name: "Luis", email: "luis@example.com" },
];

function getLast<T>(list: T[]): T | undefined {
    return list[list.length - 1];   
}

function findById<T extends {id: number}>(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id)
}

const usersResponse: ApiResponse<User> = {
  data: { id: 1, name: "Ana", email: "ana@example.com" },
  error: null,
}


const userResponse: ApiResponse<User[]> = {
  data: users,
  error: null,
}


const lastUser = getLast(users);
const foundUser = findById(users, 2);

console.log(lastUser);
console.log(foundUser);

