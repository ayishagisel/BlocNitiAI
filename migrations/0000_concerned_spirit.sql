CREATE TABLE "harassment_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"harassment_types" jsonb NOT NULL,
	"additional_details" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repair_issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"room_number" integer,
	"room_name" varchar NOT NULL,
	"area" varchar NOT NULL,
	"status" varchar NOT NULL,
	"issue_description" text NOT NULL,
	"proposed_remediation" text,
	"first_request_date" date,
	"issue_began" date,
	"hpd_violation_class" varchar,
	"correction_deadline" varchar,
	"ai_analysis" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"date_of_birth" date,
	"phone" varchar,
	"address" text,
	"unit" varchar,
	"knows_organizer" boolean,
	"threatened" boolean,
	"eviction_case" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "harassment_reports" ADD CONSTRAINT "harassment_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repair_issues" ADD CONSTRAINT "repair_issues_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");