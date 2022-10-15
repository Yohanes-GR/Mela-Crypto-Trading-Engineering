CREATE TABLE "backtest_metrics" (
  "id" SERIAL PRIMARY KEY,
  "return" float,
  "no_of_trades" int,
  "winning_trades" float,
  "losing_trades" float,
  "max_drawndown" float,
  "shape_ration" float,
  "scene_id" int,
  "user_id" int
);

CREATE TABLE "scene" (
  "id" SERIAL PRIMARY KEY,
  "from_date" date,
  "to_date" date,
  "indicator_id" int
);

CREATE TABLE "indicator" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "indicator_param" (
  "id" SERIAL PRIMARY KEY,
  "param_name" varchar,
  "from" float,
  "to" float,
  "indicator_id" int
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp
);

ALTER TABLE "backtest_metrics" ADD FOREIGN KEY ("scene_id") REFERENCES "scene" ("id");

ALTER TABLE "backtest_metrics" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- ALTER TABLE "indicator" ADD FOREIGN KEY ("id") REFERENCES "scene" ("id");

-- ALTER TABLE "indicator_param" ADD FOREIGN KEY ("id") REFERENCES "indicator" ("id");
