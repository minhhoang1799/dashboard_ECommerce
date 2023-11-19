async function hashPassword(usersAndPasswords) {
    const promises = usersAndPasswords.map(async (userData) => {
        const { token1, token2 } = userData;
        const encoder = new TextEncoder();
        const data = encoder.encode(token1 + token2);

        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        return hashedPassword;
    });

    // Đợi cho tất cả các promises được giải quyết và trả về một mảng các giá trị đã giải quyết
    return Promise.all(promises);
}

export default hashPassword;