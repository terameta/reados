DO $$ BEGIN
SET client_min_messages TO WARNING;

EXECUTE createMinimumTable('user');
EXECUTE ensureIDinTable('user');
EXECUTE checkPrimaryKey('user');
EXECUTE ensureTextFieldinTable('user', 'email');
EXECUTE ensureTextFieldinTable('user', 'password');
EXECUTE ensureTextFieldinTable('user', 'type');
EXECUTE ensureUUIDFieldinTable('user', 'client');
EXECUTE ensureTimeStampZFieldinTable('user', 'created_at');
ALTER TABLE IF EXISTS public."user" ALTER COLUMN created_at SET DEFAULT now();

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
