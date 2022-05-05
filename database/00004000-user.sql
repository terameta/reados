DO $$ BEGIN
SET client_min_messages TO WARNING;

EXECUTE createMinimumTable('user');
EXECUTE ensureIDinTable('user');
EXECUTE checkPrimaryKey('user');
EXECUTE ensureTextFieldinTable('user', 'email');
EXECUTE ensureTextFieldinTable('user', 'password');
EXECUTE ensureTimeStampZFieldinTable('user', 'created_at');
ALTER TABLE IF EXISTS public."user" ALTER COLUMN created_at SET DEFAULT now();

CREATE UNIQUE INDEX IF NOT EXISTS user_email_unique
    ON public."user" USING btree
    (lower(email) COLLATE pg_catalog."default" ASC NULLS LAST);

CREATE OR REPLACE FUNCTION email_lower() RETURNS trigger AS $$BEGIN NEW.email := lower(NEW.email); RETURN NEW; END;$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER trigger_user_email_lower BEFORE INSERT OR UPDATE ON public."user" FOR EACH ROW EXECUTE PROCEDURE user_email_lower();

SET client_min_messages TO NOTICE;

END $$
