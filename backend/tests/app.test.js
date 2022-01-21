const buildApp = require('../app');


let app;

describe("API tests", () => {
  beforeAll(async () => {
    app = await buildApp();
  });

  test("API /api/measurements is working", async () => {
    
    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements'
    });

    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
    
  });

  test("limit query param is working", async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements?limit=10'
    });

    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');
    expect(JSON.parse(response.body).length).toBe(10);
    
  });
  
  test("start query param working", async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements?limit=1000000&start=2021-09-15T22:45:00.000Z'
    });

    
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');

    const jsonBody = JSON.parse(response.body);
    
    expect(jsonBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          timestamp: '2021-09-16T22:45:00.000Z'
        })
      ])
    ) 
    
    expect(jsonBody).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          timestamp: '2021-09-14T22:45:00.000Z'
        })
      ])
    )     
  });  
  
  test("stop query param working", async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements?limit=1000000&stop=2021-09-15T22:45:00.000Z'
    });

    
    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');

    const jsonBody = JSON.parse(response.body);
    
    expect(jsonBody).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          timestamp: '2021-09-16T22:45:00.000Z'
        })
      ])
    ) 
    
    expect(jsonBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          timestamp: '2021-09-14T22:45:00.000Z'
        })
      ])
    )     
  }); 
  
  test("muid query param working, empty results", async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements?limit=1000000&muid=abc'
    });

    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');

    const jsonBody = JSON.parse(response.body);

    console.log('jsonBody',jsonBody);
    
    expect(jsonBody.length).toBe(0);    
  }); 
  
  test("muid query param working, having results", async () => {

    const response = await app.inject({
      method: 'GET',
      url: '/api/measurements?limit=1000000&muid=C-2caa1954-b3c8-466c-9722-c1b72dabe32b'
    });

    expect(response.statusCode).toBe(200);
    expect(response.statusMessage).toBe('OK');

    const jsonBody = JSON.parse(response.body);
    
    expect(jsonBody.length).toBeGreaterThan(100);    
  });  

});