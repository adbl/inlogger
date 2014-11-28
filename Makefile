image := inlogger

.PHONY: build

build:
	docker build --rm -t $(image) .
