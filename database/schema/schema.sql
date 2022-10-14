CREATE TABLE "backtest_metrics" (
  "id" SERIAL PRIMARY KEY,
  "return" float,
  "no_of_trades" int,
  "winning_trades" float,
  "losing_trades" float,
  "max_drawndown" float,
  "shape_ration" float,
  "scene_id" int,
);

CREATE TABLE "scene" (
  "id" SERIAL PRIMARY KEY,
  "from_date" datetime,
  "to_date" datetime,
  "indicator_id" int
);

CREATE TABLE "indicator" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "indicator_param" int
);

CREATE TABLE "indicator_param" (
  "id" SERIAL PRIMARY KEY,
  "param_name" varchar,
  "from" float,
  "to" float
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp,
  "backtest_run" int
);

ALTER TABLE "backtest_metrics" ADD FOREIGN KEY ("scene_id") REFERENCES "scene" ("id");

ALTER TABLE "backtest_metrics" ADD FOREIGN KEY ("id") REFERENCES "users" ("backtest_run");

ALTER TABLE "indicator" ADD FOREIGN KEY ("id") REFERENCES "scene" ("indicator_id");

ALTER TABLE "indicator_param" ADD FOREIGN KEY ("id") REFERENCES "indicator" ("indicator_param");
