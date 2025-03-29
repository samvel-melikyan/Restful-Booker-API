const {test, expect} = require('@playwright/test');
const {test : apiTest} = require('../api/fixtures.js');

test.describe('Delete Booking', () => {
    let bookingID;

    test.beforeAll(async ({request}) => {
        const response = await request.post('booking', {
            data: {
                firstname: 'John2',
                lastname: 'Doe2',
                totalprice: 123,
                depositpaid: true,
                bookingdates: {
                    checkin: '2023-10-01',
                    checkout: '2023-10-10'
                },
                additionalneeds: 'Breakfast'
            }
        })
        const data = await response.json();
        bookingID = data.bookingid;
    })

    apiTest('Delete Booking', async ({request, authToken}) => {
        const response = await request.delete(`booking/${bookingID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${authToken}`
            }
        });
        expect(response.status()).toBe(201);

        const getResponse = await request.get(`booling/${bookingID}`);
        expect(getResponse.status()).toBe(404); 
    })




})