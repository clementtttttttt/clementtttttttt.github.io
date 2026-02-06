shopt -s globstar dotglob
for f in **/*.temp; do 
echo $(basename $f) 
cpp -P $f ${f%.*.*}.html -DBASE_FILE_NAME=${f%.*.*}css
done 
