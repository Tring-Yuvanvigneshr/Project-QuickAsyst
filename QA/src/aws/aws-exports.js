
export const awsConfig = {
    Auth: {
        Cognito: {
            userPoolClientId: import.meta.env.VITE_CLIENT_ID,
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            region: import.meta.env.VITE_REGION,
        }
    },
};
