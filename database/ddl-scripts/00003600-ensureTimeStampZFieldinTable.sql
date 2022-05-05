CREATE OR REPLACE FUNCTION ensureTimeStampZFieldinTable(tableName TEXT, fieldName TEXT) RETURNS void AS $$
	BEGIN
		EXECUTE 'ALTER TABLE public."' || tableName || '" ADD COLUMN IF NOT EXISTS "' || fieldName || '"  TIMESTAMP WITH TIME ZONE';
		IF NOT EXISTS (
			SELECT data_type
			FROM information_schema.columns
			WHERE 
				table_name = tableName
				AND column_name = fieldName 
				AND data_type = 'timestamp with time zone'
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN "' || fieldName || '" TYPE TIMESTAMP WITH TIME ZONE USING ' || fieldName || '::TIMESTAMP WITH TIME ZONE;';
		END IF;
	END;
$$ LANGUAGE plpgsql;