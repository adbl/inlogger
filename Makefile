image := inlogger

.PHONY: image clean

image:
	docker build --rm -t $(image) .

clean:
	-rm static/bundle.js
	-rm static/bundle.min.js
	-rm -r node_modules
