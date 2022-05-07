DO $$ BEGIN

SET client_min_messages TO WARNING;

EXECUTE createMinimumTable('client');
EXECUTE ensureIDinTable('client');
EXECUTE checkPrimaryKey('client');
EXECUTE ensureTextFieldinTable('client', 'name');
EXECUTE ensureTextFieldinTable('client', 'mainDomain');
EXECUTE ensureTextFieldinTable('client', 'customDomain');
EXECUTE ensureTimeStampZFieldinTable('client', 'createdAt');
ALTER TABLE IF EXISTS public."client" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE IF EXISTS public."client" DROP COLUMN IF EXISTS created_at;

SET client_min_messages TO NOTICE;

END $$