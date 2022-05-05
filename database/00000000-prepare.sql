-- uuid_generate_v1 will be used as standard

-- To disable audit triggers on a table:
-- DROP audit_trigger_row name ON table_name
-- DROP audit_trigger_stm name ON table_name
-- To enable audit triggers on a table:
-- perform audit.audit_table('table_name');

\i 00001000-enablePlugins.sql
\i 00002000-enableAudit.sql
\i 00003000-createMinimumTable.sql
\i 00003100-ensureIDinTable.sql
\i 00003200-checkPrimaryKey.sql
\i 00003300-ensureTextFieldinTable.sql
\i 00003400-ensureNumericFieldinTable.sql
\i 00003500-ensureBooleanFieldinTable.sql
\i 00003600-ensureTimeStampZFieldinTable.sql

\i 00004000-user.sql