CREATE OR REPLACE FUNCTION checkPrimaryKey(tableName TEXT) RETURNS void AS $$
	BEGIN
		IF NOT EXISTS (
			SELECT constraint_name
			FROM information_schema.table_constraints
			WHERE table_name = tableName AND constraint_type = 'PRIMARY KEY'
		) THEN
			EXECUTE 'ALTER TABLE public."' || tableName || '" ADD CONSTRAINT "' || tableName || '_id_pk" PRIMARY KEY (id);';
		END IF;
	END;
$$ LANGUAGE plpgsql;
