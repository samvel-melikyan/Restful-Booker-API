// import {test, expect, request} from '@playwright/test';

// test.describe.configure({mode: 'serial'});

// test.describe('Restful Booking API tests', () => {
//     let apiContext;
//     let bookingId;
//     let token;

//     test.beforeAll(async () => {
//         apiContext = await request.newContext({
//             baseURL: 'https://restful-booker.herokuapp.com'
//         });
//         const authResponse = await apiContext.post('/auth', {
//             json: {
//                 username: 'admin',
//                 password: 'password123'
//             }
//         });

//         expect(authResponse.ok()).toBe(true);
//         expect(authResponse.status()).toBe(200);

//         const authData = await authResponse.json();
//         token = authData.token;
//     });


//     test('Create a booking', async () => {
//         const response = await apiContext.post('/booking', {
//             json: {
//                 firstname: 'Gloria',
//                 lastname: 'Harlsy',
//                 totalprice: 165,
//                 depositpaid: true,
//                 bookingdates: {
//                     checkin: '2021-01-01',
//                     checkout: '2021-01-02'
//                 },
//                 additionalneeds: 'Breakfast'
//             }
//         });
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(200);

//         const data = await response.json();
//         expect(data.bookingId).toBeDefined(); 
//         bookingId = data.bookingid;  
//     });


//     test('Get booking id', async () => {
//         const response = await apiContext.get('/booking');
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(200);

//         const data = await response.json();
//         expect( Array.isArray(data) ).toBe(true);
//         expect(data.length).toBeGreaterThan(0);

//         const isBookingIdPresent = data.some(element => element.bookingid === bookingId);
//         expect(isBookingIdPresent).toBe(true);
//     });


//     test('Get booking by id', async () => {
//         const response = await apiContext.get(`/booking/${bookingId}`);
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(200);

//         const data = await response.json();
//         expect(data.bookingid).toBe(bookingId);
//         expect(data.firstname).toBe('Gloria');
//         expect(data.lastname).toBe('Harlsy');
//     });
    

//     test('Update booking by us', async () => {
//         const response = await apiContext.put(`/booking/${bookingId}`, {
//             json: {
//                 firstname: 'Marko',
//                 lastname: 'Polo',
//                 totalprice: 165,
//                 depositpaid: true,
//                 bookingdates: {
//                     checkin: '2021-01-01',
//                     checkout: '2021-01-02'
//                 },
//                 additionalneeds: 'Breakfast'
//             }
//         });
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(200);

//         const data = await response.json();
//         expect(data.firstname).toBe('Marko');
//         expect(data.lastname).toBe('Polo');
//     })


//     test('Partial update booking by isd', async () => {
//         const response = await apiContext.patch(`/booking/${bookingId}`, {
//             json: {
//                 firstname: 'Shrilanko'
//             }
//         });
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(200);

//         const data = await response.json();
//         expect(data.firstname).toBe('Shrilanko');
//         expect(data.lastname).toBe('Polo');
//         expect(data).toHaveProperty('totalprice');
//         expect(data).toHaveProperty('depositpaid');
//         expect(data).toHaveProperty('bookingdates');
//         expect(data.additionalneeds).toHaveProperty('checkin');
//         expect(data.additionalneeds).toHaveProperty('checkout');
//         expect(data).toHaveProperty('additionalneeds'); 
//     })


//     test('Delete booking by id', async () => {
//         const response = await apiContext.delete(`/booking/${bookingId}`);
//         expect(response.ok()).toBe(true);
//         expect(response.status()).toBe(201);

//         const getResponse = await apiContext.get(`/booking/${bookingId}`);
//         expect(getResponse.ok()).toBe(false);
//         expect(getResponse.status()).toBe(404);
//     });
// });