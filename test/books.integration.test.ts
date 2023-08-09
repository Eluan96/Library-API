import express from "express";
import request from "supertest";
import bookRoute from "../src/routes/bookRoutes"

const app = express();

app.use(express.json());
app.use('/books', bookRoute);


describe('book Api integration test', ()=> {
    it('GET /books/getbooks', async ()=>{
       const {body, statusCode} = await request(app).get('/books/getbooks')
       .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3NmZlNzk1LWFlZTktNDk0OC1iYTNmLWE0ZTU2N2E1MDI2YiIsImVtYWlsIjoiMjMxcGl6eUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRlQ3c5cy85N0ppVTdvUzNsRGRBSkd1MmJVWUVpTXRMRnhaQXBHSklIN1RUL2pZRGJvbEc0MiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjNUMTU6MTU6MDIrMDE6MDAiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTIzVDE1OjE1OjAyKzAxOjAwIiwidXNlck5hbWUiOiJwaXp6eTIzMSIsImlhdCI6MTY4NzUzMDMxMn0.FBxwbU1LNK2-EOrhVtIA59kfEfN1MecgVDRSIbOInF8`)

       expect(body).toEqual(
        expect.arrayContaining([
         expect.objectContaining({
            title: expect.any(String),
            author: expect.any(String),
            datePublished: expect.any(Number),
            description: expect.any(String),
            pageCount: expect.any(Number),
            Genre: expect.any(String),
            bookId: expect.any(String),
            publisher: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
         })
        ])
       )
       expect(statusCode).toBe(200);
    })

    it('PUT request /books/update', async () => {
        
        const {body, statusCode} = await request(app).put('/books/update').set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3NmZlNzk1LWFlZTktNDk0OC1iYTNmLWE0ZTU2N2E1MDI2YiIsImVtYWlsIjoiMjMxcGl6eUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRlQ3c5cy85N0ppVTdvUzNsRGRBSkd1MmJVWUVpTXRMRnhaQXBHSklIN1RUL2pZRGJvbEc0MiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjNUMTU6MTU6MDIrMDE6MDAiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTIzVDE1OjE1OjAyKzAxOjAwIiwidXNlck5hbWUiOiJwaXp6eTIzMSIsImlhdCI6MTY4NzUzMDMxMn0.FBxwbU1LNK2-EOrhVtIA59kfEfN1MecgVDRSIbOInF8`)
        .send({
            title: expect.any(String),
            author: expect.any(String),
            datePublished: expect.any(Number),
            description: expect.any(String),
            pageCount: expect.any(Number),
            Genre: expect.any(String),
            bookId: expect.any(String),
            publisher: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
        
        expect(statusCode).toBe(404);
        expect(body).toEqual({
            errors: true,
            message: "book not found"
            
        })
    })
})