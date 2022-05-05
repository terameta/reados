CREATE OR REPLACE FUNCTION ensureNumericFieldinTable(tableName TEXT, fieldName TEXT, prc INTEGER DEFAULT 24, scl INTEGER DEFAULT 10) RETURNS void AS $$
	BEGIN
		EXECUTE 'ALTER TABLE public."' || tableName || '" ADD COLUMN IF NOT EXISTS "' || fieldName || '" NUMERIC(' || prc || ',' || scl || ');';
		IF NOT EXISTS (
			SELECT data_type
			FROM information_schema.columns
			WHERE 
				table_name = tableName
				AND column_name = fieldName 
				AND data_type = 'numeric'
				AND numeric_precision = prc
				AND numeric_scale = scl
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN "' || fieldName || '" TYPE NUMERIC(' || prc || ',' || scl || ') USING "' || fieldName || '"::NUMERIC(' || prc || ',' || scl || ');';
		END IF;
	END;
$$ LANGUAGE plpgsql;