const {test : base} = require('@playwright/test');
const {getAuthToken} = require('../../utils/apiHelper.js');


exports.test = base.extend({
    authToken: async ({request}, use ) => {
        const token = await getAuthToken(request);
        await use(token);
    }
})




