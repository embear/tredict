SOURCES = $(filter-out %.min.js, $(wildcard *.js))
TARGETS = $(SOURCES:.js=.min.js)
.PHONY: all clean

all: $(TARGETS)

clean:
	rm -vf $(TARGETS)

%.min.js: %.js
	uglifyjs --compress --mangle --output $@ $<
