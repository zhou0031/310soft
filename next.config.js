/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'placehold.jp',
                port:'',
                pathname:'/**'
            },
            {
                protocol:'https',
                hostname:'placehold.co',
                port:'',
                pathname:'/**'
            },
            {
                protocol:'https',
                hostname:'**.googleusercontent.com',
                port:'',
                pathname:'/**'
            },
            {
                protocol:'https',
                hostname:'**.fbcdn.net',
                port:'',
                pathname:'/**'
            },
            {
                protocol:'https',
                hostname:'r2.310soft.com',
                port:'',
                pathname:'/**'
            }
        ]
    },
    experimental:{serverActions:true},
    
}

module.exports = nextConfig
