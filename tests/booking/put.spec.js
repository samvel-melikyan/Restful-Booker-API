const {test, expect} = require('@playwright/test');
const {test : apiTest} = require('../api/fixtures.js');

test.describe('Update Booking', () => {
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

    apiTest('Update booking by id', async ({request, authToken}) => {
        const response = await request.put(`/booking/${bookingID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authToken}`
            },
            data: {
                firstname: 'Jane',
                lastname: 'Smith',
                totalprice: 456,
                depositpaid: false,
                bookingdates: {
                    checkin: '2023-11-01',
                    checkout: '2023-11-10'
                },
                additionalneeds: 'Dinner'
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('firstname', 'Jane');
        expect(data).toHaveProperty('lastname', 'Smith');
        expect(data).toHaveProperty('totalprice', 456);
        expect(data).toHaveProperty('depositpaid', false);
        expect(data).toHaveProperty('bookingdates');
        expect(data.bookingdates).toHaveProperty('checkin', '2023-11-01');
        expect(data.bookingdates).toHaveProperty('checkout', '2023-11-10'); 
        expect(data).toHaveProperty('additionalneeds', 'Dinner');
    });

})