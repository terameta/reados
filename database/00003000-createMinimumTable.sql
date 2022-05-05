CREATE OR REPLACE FUNCTION createMinimumTable(tableName TEXT) RETURNS void AS $$
	BEGIN
		EXECUTE 'CREATE TABLE IF NOT EXISTS public."' || tableName || '"();';
	END;
$$ LANGUAGE plpgsql;