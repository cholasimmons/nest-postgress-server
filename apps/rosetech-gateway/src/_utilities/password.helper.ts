import * as bcrypt from 'bcrypt';
export async function comparePasswords(userPassword: string, databasePassword: string) {
    // const salt = await bcrypt.genSalt(3);
    const password = await bcrypt.compare(userPassword, databasePassword);
    return password
}  