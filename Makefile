image := inlogger

.PHONY: image clean db

image: db
	docker build --rm -t $(image) .

db: db/inlogger.sqlite3

db/inlogger.sqlite3: db/schema.sql
	sqlite3 $@ < db/schema.sql

clean:
	-rm inlogger/static/bundle.js
	-rm inlogger/static/bundle.min.js
	-rm -r node_modules
	-rm inlogger/*.pyc
