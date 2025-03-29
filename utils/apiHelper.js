async function getAuthToken(request){
    const response = await request.post('/auth',  {
        data : {
            username: 'admin',
            password: 'password123'
        }
    })

    if (!response.ok)
        throw new Error('Failed to get auth token')
    
    const data = await response.json()
    return data.token
}


module.exports = {
    getAuthToken
};
