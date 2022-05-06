content=$(cat ../local.settings.json);
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


cd ddl-scripts
az config set extension.use_dynamic_install=yes_without_prompt
for file in ./*; do echo $file; psql -h $dbhost -U $dbuser -p $dbport -d $dbname -f $file; done
cd ..
