# Build list of sources and targets
SOURCES = $(filter-out %.min.js, $(wildcard *.js))
TARGETS = $(SOURCES:.js=.min.js)

# Configure minifier
MINIFIER = uglifyjs
MINIFIER_ARGS =
#MINIFIER_ARGS += --compress
MINIFIER_ARGS += --mangle

.PHONY: all clean

all: $(TARGETS)

clean:
	rm -vf $(TARGETS)

%.min.js: %.js
	$(MINIFIER) $(MINIFIER_ARGS) --output $@ $<
