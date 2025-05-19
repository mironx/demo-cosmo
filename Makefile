.PHONY: wgc-install wgc-compose-local-static-schema wgc-compose-local wgc-start-router-local-static-schema

# wgc-install: Install the WunderGraph CLI if not already installed
wgc-install:
	@which wgc > /dev/null || npm install -g @wundergraph/cosmo-router




# wgc-compose: Generate the supergraph schema using the WunderGraph CLI
wgc-compose-local-static-schema: wgc-install
	cd run-router/local-static-schema && \
	wgc router compose \
		-i subgraph-config.yaml \
		-o supergraph.graphql

wgc-compose-local: wgc-compose-local-static-schema

wgc-start-router-local-static-schema: wgc-install
	cd run-router/local-static-schema && \
	npx wgc router download-binary -o . || true && \
	./router


subgraph-start:




