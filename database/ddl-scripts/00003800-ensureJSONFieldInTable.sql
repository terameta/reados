CREATE OR REPLACE FUNCTION ensureJSONFieldinTable(tableName TEXT, fieldName TEXT) RETURNS void AS $$
	BEGIN
		EXECUTE 'ALTER TABLE public."' || tableName || '" ADD COLUMN IF NOT EXISTS "' || fieldName || '" JSON';
		IF NOT EXISTS (
			SELECT data_type
			FROM information_schema.columns
			WHERE table_name = tableName
			AND column_name = fieldName AND data_type = 'text'
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN "' || fieldName || '" TYPE JSON USING "' || fieldName || '"::JSON;';
		END IF;
	END;
$$ LANGUAGE plpgsql;