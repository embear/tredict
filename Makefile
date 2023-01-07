# Build list of sources and targets
SOURCES = $(filter-out %.min.js, $(wildcard *.js))
TARGETS = $(SOURCES:.js=.min.js)

SILENT = @
# Configure minifier
MINIFIER = uglifyjs
#MINIFIER += --compress
MINIFIER += --validate
MINIFIER += --warn
MINIFIER += --mangle
# MINIFIER += --beautify

.PHONY: all clean

all: $(TARGETS)

clean:
	$(SILENT)echo "Cleaning"
	$(SILENT)rm -vf $(TARGETS)

%.min.js: %.js
	$(SILENT)echo "Building $@"
	$(SILENT)rm -f $@
	$(SILENT)grep '//\s*PREPEND' $< | sed -e 's%//\s*PREPEND\s*%%' >> $@
	$(SILENT)cpp $< | grep -v '^#' | $(MINIFIER)                   >> $@
	$(SILENT)grep '//\s*APPEND' $< | sed -e 's%//\s*APPEND\s*%%'   >> $@
