/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'placehold.co',
                port:'',
                pathname:'/100x150@2x.png'
            }
        ]
    }
}

module.exports = nextConfig
