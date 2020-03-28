# Changelog

All notable changes to the Pipeline Manager UI project will be documented in this file.

## [1.0.0] - 28-03-2020

### Added

- Pipeline Manager interactive GUI (Graphical User Interface) - *NOT YET INTEGRATED WITH THE REAL PIPERT SERVER* - with the following features:
	- "Create-A-Component"
	- "Create-A-Routine", complete with queues between routines
	- Delete a component
	- Save a pipeline (consists of sending a JSON to the server while exporting a local YAML file)
	- Kill a pipeline (sends a PUT "/kill" request)
	- Load a pipeline (either from cache or from a local YAML file)
	- Distinguish between routine types in order to block the creation of certain routines at certain times (eg. block addition of Listen2Stream after its creation)
	- Responsive routines & connections (queues)
- Mock NodeJS server as a part of the docker-compose
- Production ready docker-compose file, Dockerfiles (Prod. + Dev.) for the client and a Prod. Dockerfile for the mock server