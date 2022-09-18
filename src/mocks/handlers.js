import { rest } from "msw";

const baseURL = "https://recipe-star-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        // log in as admin into app, add 'dj-rest-auth/user/' to http address, copy content and past below
        pk: 2,
        username: "brian",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dgjrrvdbl/image/upload/v1/media/../default_profile_qdjgyp",
        //   copy end
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];