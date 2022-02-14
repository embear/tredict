# Build list of sources and targets
SOURCES = $(filter-out %.min.js, $(wildcard *.js))
TARGETS = $(SOURCES:.js=.min.js)

SILENT = @
# Configure minifier
MINIFIER = uglifyjs
#MINIFIER += --compress
MINIFIER += --mangle

.PHONY: all clean

all: $(TARGETS)

clean:
	$(SILENT)echo "Cleaning"
	$(SILENT)rm -vf $(TARGETS)

%.min.js: %.js
	$(SILENT)echo "Building $@"
	$(SILENT)cpp $< | grep -v '^#' | $(MINIFIER) --output $@
