content=$(cat ../functions/local.settings.json);
dbhost=$(echo $content | jq -r '.Values.dbhost');
dbuser=$(echo $content | jq -r '.Values.dbuser');
dbpass=$(echo $content | jq -r '.Values.dbpass');
dbport=$(echo $content | jq -r '.Values.dbport');
dbname=$(echo $content | jq -r '.Values.dbname');
echo User $dbuser
echo Pass $dbpass
echo Host $dbhost
echo Port $dbport
echo Name $dbname
psql -h $dbhost -U $dbuser -p $dbport -d $dbname -f 00000000-prepare.sql
