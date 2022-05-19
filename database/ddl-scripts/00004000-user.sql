DO $$ BEGIN
SET client_min_messages TO WARNING;

EXECUTE createMinimumTable('user');
EXECUTE ensureIDinTable('user');
EXECUTE checkPrimaryKey('user');
EXECUTE ensureTextFieldinTable('user', 'email');
EXECUTE ensureTextFieldinTable('user', 'password');
EXECUTE ensureTextFieldinTable('user', 'type');
EXECUTE ensureBooleanFieldinTable('user', 'isPrimaryAdmin', true, false);
EXECUTE ensureJSONFieldinTable('user', 'details');
EXECUTE ensureTimeStampZFieldinTable('user', 'createdAt');
ALTER TABLE IF EXISTS public."user" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE IF EXISTS public."user" ALTER COLUMN "isPrimaryAdmin" SET DEFAULT false;
ALTER TABLE IF EXISTS public."user" ALTER COLUMN "details" SET DEFAULT '{}'::JSON;
UPDATE public."user" SET "details" = '{}'::JSON WHERE "details" IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS user_email_unique
    ON public."user" USING btree
    (lower(email) COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE OR REPLACE FUNCTION email_lower() RETURNS trigger AS $inner$ BEGIN NEW.email := lower(NEW.email); RETURN NEW; END;$inner$ LANGUAGE plpgsql;

DO $trigger$ BEGIN
	DROP TRIGGER IF EXISTS trigger_user_email_lower ON public."user";
	CREATE TRIGGER trigger_user_email_lower BEFORE INSERT OR UPDATE ON public."user" FOR EACH ROW EXECUTE PROCEDURE email_lower();
END; $trigger$ LANGUAGE plpgsql;

SET client_min_messages TO NOTICE;

END $$
