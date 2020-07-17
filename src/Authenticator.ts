import * as jwt from "jsonwebtoken"; 

interface AuthenticationData {
    id: string
}

export class Authenticator {
    private static EXPIRES_IN = "100min";

    generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            {
                id: input.id
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.EXPIRES_IN
            }
        )
        return token;
    }

    getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const result: AuthenticationData = 
        {
            id: payload.id
        }
        return result
    }

}

