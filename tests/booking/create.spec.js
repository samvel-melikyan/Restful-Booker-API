const {test, expect} = require('@playwright/test');

let bookingID;

test.describe('Create Booking', () => {

    test('Create a new booking', async ({request}) => {
        const response = await request.post('/booking', {
            data: {
                firstname: 'John',
                lastname: 'Doe',
                totalprice: 123,
                depositpaid: true,
                bookingdates: {
                    checkin: '2023-10-01',
                    checkout: '2023-10-10'
                },
                additionalneeds: 'Breakfast'
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.bookingid).toBeDefined();

        expect(data).toHaveProperty('booking');
        expect(data.booking).toHaveProperty('firstname', 'John');

        bookingID = data.bookingid;
    });

})