import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 4500000, // Limit each IP to 100 requests per `window`. In 1 sec have 5 req.
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  statusCode: 429,
  message: "The request limit is reached.",
});

export default limiter;
