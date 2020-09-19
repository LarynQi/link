
# run: . build.sh
# if permission denied, run chmod +x build.sh

# echo "Hello World"

STRLENGTH=$(echo -n $PWD | wc -m)
# echo $STRLENGTH
link=${PWD:$STRLENGTH - 4:STRLENGTH}
# echo $link

if [ link == "link" ]
then
	cd frontend
	npm run build
	cd ../backend
	python3 main.py
	cd ..
else
	echo "must run from link directory"
fi
