CREATE OR REPLACE FUNCTION ensureIDinTable(tableName TEXT) RETURNS void AS $$
	BEGIN
		EXECUTE 'ALTER TABLE public."' || tableName || '" ADD COLUMN IF NOT EXISTS id UUID NOT NULL DEFAULT gen_random_uuid();';
		IF NOT EXISTS (
			SELECT data_type
			FROM information_schema.columns
			WHERE table_name = tableName
			AND column_name = 'id' AND data_type = 'uuid'
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ALTER COLUMN id TYPE UUID USING id::UUID;';
		END IF;
	END;
$$ LANGUAGE plpgsql;