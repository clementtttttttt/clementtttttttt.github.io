shopt -s globstar dotglob
for f in **/*.temp; do 
echo $(basename $f) 
cpp -P $f ${f%.*.*}.html
done 
