CREATE OR REPLACE FUNCTION ensureBooleanFieldinTable(tableName TEXT, fieldName TEXT, hasDefault BOOLEAN DEFAULT false, defaultValue BOOLEAN DEFAULT false) RETURNS void AS $$
	BEGIN
		EXECUTE 'ALTER TABLE public."' || tableName || '" ADD COLUMN IF NOT EXISTS "' || fieldName || '" BOOLEAN';
		IF NOT EXISTS (
			SELECT data_type
			FROM information_schema.columns
			WHERE table_name = tableName
			AND column_name = fieldName AND data_type = 'boolean'
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN "' || fieldName || '" TYPE BOOLEAN USING "' || fieldName || '"::BOOLEAN;';
			IF(hasDefault) THEN
				EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN "' || fieldName || '" SET DEFAULT ' || defaultValue || ';';
			END IF;
		END IF;
	END;
$$ LANGUAGE plpgsql;