interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: "admin" | "editor" | "viewer";
}

interface ConfigInput {
    name: keyof User;
    type: 'text' | 'email' | 'number';
    placeholder: string;
}

const inputs: ConfigInput[] = [
    { name: 'name', type: 'text', placeholder: 'Escribe tu nombre completo' },
    { name: 'email', type: 'email', placeholder: 'correo@ejemplo.com' },
    { name: 'age', type: 'number', placeholder: 'Tu edad' }
];

const user: User = {
    id: 1,
    name: "Ana",
    email: "ana@example.com",
    age: 24,
    role: "editor",
};

function updateUser(user: User, changes: Partial<User>) {
    return { ...user, ...changes };
}

updateUser(user, { age: 25 });
updateUser(user, { name: "Ana María", role: "admin" });
updateUser(user, { agee: 25 });

function getPublicProfile(user: User): Pick<User, "id" | "name">  {
    return { id: user.id, name: user.name }

}

let nextId = 2; 

function createUser (input: Omit<User, "id">): User {
    return {
        ...input, id: nextId++
    }
}

createUser({ name: "Luis", email: "luis@example.com", age: 30, role: "viewer" });
createUser({ id: 9, name: "Luis", email: "luis@example.com", age: 30, role: "viewer" });
