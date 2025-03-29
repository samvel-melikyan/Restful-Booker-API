const {test, expect} = require('@playwright/test');
const {test : apiTest} = require('../api/fixtures.js');

test.describe('Get Booking', () => {
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
    


    apiTest("Get all booking id's", async ({request}) => {
        const response = await request.get('/booking');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);

        let flag = false;
        for (let elem of data){
            expect(elem).toHaveProperty('bookingid');
            if (elem.bookingid === bookingID){
                flag = true;
            }
        }
        expect(flag).toBe(true);
    });


    apiTest('Get booking by id', async ({request}) => {

        const response = await request.get(`/booking/${bookingID}`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('firstname', 'John2');  
        expect(data.lastname).toBeDefined();
        expect(data.totalprice).toBeDefined();
        expect(data.depositpaid).toBeDefined();
        expect(data.bookingdates).toBeDefined();
        expect(data.bookingdates.checkin).toBeDefined();
        expect(data.bookingdates.checkout).toBeDefined();
        expect(data.additionalneeds).toBeDefined();
    })


})