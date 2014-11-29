image := inlogger

.PHONY: image clean

image:
	docker build --rm -t $(image) .

clean:
	-rm inlogger/static/bundle.js
	-rm inlogger/static/bundle.min.js
	-rm -r node_modules
