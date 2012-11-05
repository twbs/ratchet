#
# BUILD LIB FILES
#

build:
	mkdir -p dist
	cat lib/css/base.css lib/css/bars.css lib/css/lists.css lib/css/forms.css lib/css/buttons.css lib/css/chevrons.css lib/css/counts.css lib/css/segmented-controllers.css lib/css/popovers.css lib/css/sliders.css lib/css/toggles.css lib/css/push.css > ./dist/ratchet.tmp.css
	cat lib/js/*.js > ./dist/ratchet.tmp.js
	@echo "/**\n * ==================================\n * Ratchet v1.0.0\n * Licensed under The MIT License\n * http://opensource.org/licenses/MIT\n * ==================================\n */\n" > ./dist/copywrite.txt
	cat ./dist/copywrite.txt ./dist/ratchet.tmp.js  > ./dist/ratchet.js
	cat ./dist/copywrite.txt ./dist/ratchet.tmp.css > ./dist/ratchet.css
	rm  ./dist/ratchet.tmp.css ./dist/ratchet.tmp.js ./dist/copywrite.txt


#
# START DOCS SERVER
#

docs:
	open http://localhost:8000/docs
	python -m SimpleHTTPServer


#
# BUILDS GH-PAGES BRANCH
#

gh-pages: build
	mkdir -p gh-pages
	cp -r docs/ gh-pages/
	cp -r lib gh-pages/lib
	cp -r dist gh-pages/dist
	cd gh-pages
	cp -r dist ratchet
	zip -r ratchet.zip ratchet
	rm -rf ratchet
	cd ..
	git fetch origin
	git checkout gh-pages
	sed -i -e 's/\.\.\//\.\//g' gh-pages/index.html
	sed -i -e 's/\.\.\//\.\//g' gh-pages/one.html
	sed -i -e 's/\.\.\//\.\//g' gh-pages/two.html
	rm -rf ./css
	rm -rf ./img
	rm -rf ./js
	rm -rf ./lib
	rm -rf ./dist
	mv gh-pages/* .
	rm -rf ./*-e
	rm -rf gh-pages

#
# START DEMO SERVER
#

demo: build_demo
	open http://localhost:8000/test/app
	python -m SimpleHTTPServer

#
# START TEST SERVER
#

test:
	open http://localhost:8000/test
	python -m SimpleHTTPServer


.PHONY: docs demo test gh-pages