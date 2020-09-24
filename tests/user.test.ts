import app from "../src/app";
import request from "supertest";
import userServices from "../src/controller/user/userServices";

// @ts-ignore
import {reqDummy,reqDummyId, dbDummy, dbDummyId, setUpUserCollection} from "./fixtures/db";

beforeEach(async () => {
    await setUpUserCollection();
});

test("Sign up a new user", async () => {

    const reqUser = reqDummy;

    await request(app).post("/user/signUp").send({
        user: reqUser
    }).expect(201);

    // @ts-ignore
    delete reqUser.password;

    const user = await userServices.find("findOne", reqUser);
    expect(user).not.toBeUndefined();
    expect(user).not.toBeNull();
});

test("Sign up a new user with invalid email", async () => {

    const reqUser = reqDummy;
    reqUser.email = "alirezagmail.com"

    await request(app).post("/user/signUp").send({
        user: reqUser
    }).expect(400);

    // @ts-ignore
    delete reqUser.password;

    const user = await userServices.find("findOne", reqUser);
    expect(user).toBeUndefined();
});

test("Sign up a new user with duplicated email", async () => {
    const reqUser = reqDummy;
    reqUser.email = dbDummy.email;

    await request(app).post("/user/signUp").send({
        user: reqUser
    }).expect(400);

    // @ts-ignore
    delete reqUser.password;

    const user = await userServices.find("findOne", reqUser);
    expect(user).toBeUndefined();
});

test("Sign up a new user with invalid username", async () => {
    const reqUser = reqDummy;
    reqUser.userName = "kia"

    await request(app).post("/user/signUp").send({
        user: reqUser
    }).expect(400);

    // @ts-ignore
    delete reqUser.password;

    const user = await userServices.find("findOne", reqUser);
    expect(user).toBeUndefined();
});

test("Sign up a new user with duplicated username", async () => {
    const reqUser = reqDummy;
    reqUser.userName = dbDummy.userName;

    await request(app).post("/user/signUp").send({
        user: reqUser
    }).expect(400);

    // @ts-ignore
    delete reqUser.password;

    const user = await userServices.find("findOne", reqUser);
    expect(user).toBeUndefined();
});

test("login user with email", async () => {
    const response = await request(app).post("/user/login").send({
        password: dbDummy.password,
        userInput: dbDummy.email,
    }).expect(200);

    expect(response.body.user.email).toBe(dbDummy.email);
    expect(response.body.user.nickName).toBe(dbDummy.nickName);
    expect(response.body.user._id).toBe(dbDummy._id);
    expect(response.body.user.userName).toBe(dbDummy.userName);
});

test("login user with username", async () => {
    const response = await request(app).post("/user/login").send({
        password: dbDummy.password,
        userInput: dbDummy.userName,
    }).expect(200);

    expect(response.body.user.email).toBe(dbDummy.email);
    expect(response.body.user.nickName).toBe(dbDummy.nickName);
    expect(response.body.user._id).toBe(dbDummy._id);
    expect(response.body.user.userName).toBe(dbDummy.userName);
});

test("login user with invalid input", async () => {
    const response = await request(app).post("/user/login").send({
        password: dbDummy.password,
        userInput: "asd",
    }).expect(400);

    expect(response.body.error).not.toBeUndefined();
    expect(response.body.user).toBeUndefined();
});

test("login user with wrong email", async () => {
    const response = await request(app).post("/user/login").send({
        password: dbDummy.password,
        userInput: "asd@asd.com",
    }).expect(400);

    expect(response.body.error).not.toBeUndefined();
    expect(response.body.user).toBeUndefined();
});

test("login user with wrong username", async () => {
    const response = await request(app).post("/user/login").send({
        password: dbDummy.password,
        userInput: "asdasdasdcom",
    }).expect(400);

    expect(response.body.error).not.toBeUndefined();
    expect(response.body.user).toBeUndefined();
});

test("login user with wrong password", async () => {
    const response = await request(app).post("/user/login").send({
        password: "wrongPassword",
        userInput: dbDummy.userName,
    }).expect(400);

    expect(response.body.error).not.toBeUndefined();
    expect(response.body.user).toBeUndefined();
});

test("auth checker", async () => {
    const response = await request(app).get("/user/auth").set({Authorization: `Bearer ${dbDummy.tokens[0].token}`}).send().expect(200)

    expect(response.body.email).toBe(dbDummy.email);
    expect(response.body.nickName).toBe(dbDummy.nickName);
    expect(response.body._id).toBe(dbDummy._id);
    expect(response.body.userName).toBe(dbDummy.userName);
});

test("auth checker with wrong token", async () => {
    const response = await request(app).get("/user/auth").set({Authorization: `Bearer ${dbDummy.tokens[0].token + "wrong"}`}).send().expect(302);
    expect(response.body).toEqual({});
});
