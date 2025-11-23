import axios from "axios";
import urlBuilder from "../url-builder";
export async function refreshAccessToken(token: any) {
    try {
        const url = urlBuilder.v1().auth().refresh().build();
        const tokenResponse = await axios.post(
            url,
            {},
            {
                headers: {
                    Cookie: token.refreshToken,
                },
            }
        );

        return {
            ...token,
            accessToken: tokenResponse.data.access_token,
            expiresIn: tokenResponse.data.accessTokenExpiration as string,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        }

        return {
            error: "RefreshAccessTokenError",
        };
    }
}
