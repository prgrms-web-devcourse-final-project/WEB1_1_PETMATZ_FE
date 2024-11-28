export default function getDefaultProfileImg(url: string) {
    const defaultProfiles: Record<string, string> = {
        profile1: '/src/assets/images/profile/profile1.svg',
        profile2: '/src/assets/images/profile/profile2.svg',
        profile3: '/src/assets/images/profile/profile3.svg',
    };

    if (url.startsWith('http')) return url;

    return defaultProfiles[url];
}
