const {test, expect} = require('@playwright/test');
const {test : apiTest} = require('../api/fixtures.js');

test.describe('Partially update Booking', () => {

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
    
    apiTest('Partially update booking by id', async ({request, authToken}) => {
        const response = await request.patch(`/booking/${bookingID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authToken}`
            },
            data: {
                firstname: 'Jane',
                lastname: 'Smith'
            }
            
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('firstname', 'Jane');
        expect(data).toHaveProperty('lastname', 'Smith');
        expect(data).toHaveProperty('totalprice', 123);
        expect(data).toHaveProperty('depositpaid', true);
        expect(data).toHaveProperty('bookingdates');
        expect(data.bookingdates).toHaveProperty('checkin', '2023-10-01');
        expect(data.bookingdates).toHaveProperty('checkout', '2023-10-10'); 
        expect(data).toHaveProperty('additionalneeds', 'Breakfast');
    })


})