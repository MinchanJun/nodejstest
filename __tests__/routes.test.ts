import request from 'supertest';
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api/v1/parse', () => {
    describe('POST and Response Data', () => {

      it('responds with 200 status and json type', () => {
        return request(server)
          .post('/api/v1/parse')
          .send({
            data: "JOHN0000MICHAEL0009994567"
          })
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(200)
          .then(res => {
            
            expect(res.body.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("firstName", "JOHN0000");
            expect(res.body.data).toHaveProperty("lastName", "MICHAEL000");
            expect(res.body.data).toHaveProperty("clientId", "9994567");
          })
      });

      it('responds with 200 status and json type with different body data', () => {
        return request(server)
          .post('/api/v1/parse')
          .send({
            data: "CARLSJUNIOR0000SIEERAS000784525"
          })
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(200)
          .then(res => {
            
            expect(res.body.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("firstName", "CARLSJUNIOR0000");
            expect(res.body.data).toHaveProperty("lastName", "SIEERAS000");
            expect(res.body.data).toHaveProperty("clientId", "784525");
          })
      });

      it('responds with 400 status when body is empty', () => {
        return request(server)
          .post('/api/v1/parse')
          .send({
            data: ""
          })
          .expect(400)
      });

      it('responds with 404 status when route is wrong', () => {
        return request(server)
          .post('/api/v1/parsee')
          .send({
            data: ""
          })
          .expect(404)
      });

    });
  });

  describe('/api/v2/parse', () => {
    describe('POST and Response Data', () => {
      it('responds with 200 status and json type', () => {
        return request(server)
          .post('/api/v2/parse')
          .send({
            data: "JOHN0000MICHAEL0009994567"
          })
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(200)
          .then(res => {
            
            expect(res.body.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("firstName", "JOHN");
            expect(res.body.data).toHaveProperty("lastName", "MICHAEL");
            expect(res.body.data).toHaveProperty("clientId", "999-4567");
          })
      });

      it('responds with 200 status and json type with different body data', () => {
        return request(server)
          .post('/api/v2/parse')
          .send({
            data: "CARLSJUNIOR0000SIEERAS000784525"
          })
          .expect('Content-Type', "application/json; charset=utf-8")
          .expect(200)
          .then(res => {
            
            expect(res.body.statusCode).toBe(200);
            expect(res.body.data).toHaveProperty("firstName", "CARLSJUNIOR");
            expect(res.body.data).toHaveProperty("lastName", "SIEERAS");
            expect(res.body.data).toHaveProperty("clientId", "784-525");
          })
      });

      it('responds with 400 status when body is empty', () => {
        return request(server)
          .post('/api/v2/parse')
          .send({
            data: ""
          })
          .expect(400)
      });

      it('responds with 404 status when route is wrong', () => {
        return request(server)
          .post('/api/v2/parsee')
          .send({
            data: ""
          })
          .expect(404)
      });
    });
  });

});

