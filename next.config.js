/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    images: {
        allowFutureImage: true,
        domains: ['localhost'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
          },
        ],
    }
},
// env: {
//   API: 'http://localhost/mawastudio/public/api',
//   imageAPI: 'http://localhost/mawastudio/public/images',
// },
env: {
  API: 'https://admin.mawastudiothailand.com/api',
  imageAPI: 'https://admin.mawastudiothailand.com/images',
},
  reactStrictMode: true,
}
