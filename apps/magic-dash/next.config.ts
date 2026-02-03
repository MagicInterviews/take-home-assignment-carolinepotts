import { type NextConfig } from "next";

const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                has: [
                    {
                        type: 'cookie',
                        key: 'x-authenticated'
                    }
                ],
                destination: '/admin',
                permanent: true,
            },
            {
                source: '/login',
                has: [
                    {
                        type: 'cookie',
                        key: 'x-authenticated'
                    }
                ],
                destination: '/admin',
                permanent: true,
            },
            {
                source: '/',
                missing: [
                    {
                        type: 'cookie',
                        key: 'x-authenticated'
                    }
                ],
                destination: '/login',
                permanent: true,
            },
        ];
    }
} satisfies NextConfig;

export default nextConfig;
