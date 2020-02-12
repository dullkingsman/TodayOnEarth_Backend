import { KnexI } from './db'
import { User } from '../model/user'
import { hash, compare } from 'bcrypt'
import { verify, sign, TokenExpiredError } from 'jsonwebtoken'

User.knex(KnexI);

export async function createUserScheme(): Promise<any> {
    if (await KnexI.schema.hasTable('user')) return null; // We don't need to create it again

    return KnexI.schema.createTable('user', table => {
        table.increments('uid').primary();

        table.string('first_name');
        table.string('middle_name');
        table.string('last_name');
        table.string('email').unique();
        table.integer('role');

        table.string('phone_number');
        table.date('last_login_time');
        table.string('username').unique();
        table.string('country');
        table.string('last_location');  // comma separated geo data
        table.string('password_hash');
    })

}

export async function insertUser(userData: User): Promise<User> {
    return createUserScheme().then(() => User.query().insert(userData));
}

export async function getUser(uid: Number): Promise<User> {
    return User.query().findById(uid)
}

export async function isUsernameTaken(username: string): Promise<boolean> {
    const count: User[] = await User.query().where('username' , username);
    return count.length > 0;
}

export async function isEmailUsed(email: string): Promise<boolean> {
    const count: User[] = await User.query().where('email' , email);
    return count.length > 0
}

export async function verifyUser(token: string): Promise<User> {
    const verified = await verify(token, '0mE09M8N880CDhhJI$9808_369'); // shouldn't be hardcoded like this
    if (verified) {
        return getUser(verified.uid)
    }
}

export async function generateToken(user: User): Promise<string> {
    const token = await sign({ uid: user.uid } , '0mE09M8N880CDhhJI$9808_369') // shouldn't be hardcoded like this
    return token;
}

export async function deleteUser(id: number): Promise<number> {
    return User.query().deleteById(id);
}

export async function updateUserById(id: number , update: User): Promise<User> {
    return User.query()
        .updateAndFetchById(id, update);
}

export async function signInUser(email: string, password: string): Promise<string> {
    const user = await User.query().first().where({ email });
    if (!user) throw new Error('user doesn\'t exist')
    const correct = await compare(password , user.password_hash);
    if (correct) return generateToken(user);
    else throw new Error('email or password incorrect');
}

export async function signUpUser(
    first_name: string, middle_name: string, last_name: string,
    phone_number: string, username: string, country: string,
    email: string, password: string): Promise<User> {

    if (!username) throw new Error('username is required')
    else if (await isUsernameTaken(username)) throw new Error('username already taken')

    if (!email) throw new Error('email is required')
    else if (await isEmailUsed(email)) throw new Error('email already used by someone else')

    if (!password) throw new Error('password is required')
    const hashed = await hash(password, 10)
    return insertUser({
        first_name, middle_name, last_name, phone_number, username, country,
        email, password_hash: hashed   
    })

}