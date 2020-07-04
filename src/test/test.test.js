const axios = require(`axios`);

test(`Sign in with test@test.ru user`, async () => {
    const authData = {
        email: `test@test.ru`,
        password: 123123,
    };
    const response = await axios.post(process.env.REACT_APP_SIGN_IN_URL, authData);
    expect(response.status).toBe(200);
});
