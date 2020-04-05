# Changelog

All notable changes to the Pipeline Manager UI project will be documented in this file.

## [0.2.2] - 2020-04-06

### Changed

- Styling for the "Browse File" dialog in the "Load-A-Pipeline" form

## [0.2.1] - 2020-04-05

### Added

- "bump-version.sh" script

### Fixed

- Formatting on all files (using "prettier")
- Version order on this file (CHANGELOG.md)

## [0.2.0] - 2020-04-04

### Added

- Redis queues drop down list in "Create-A-Routine" form

## [0.1.1] - 2020-04-01

### Fixed

- A bug where the "Load" button was disabled until a pipeline was saved into the cache

## [0.1.0] - 2020-03-28

### Added

- Pipeline Manager interactive GUI (Graphical User Interface) - **NOT YET INTEGRATED WITH THE REAL PIPERT SERVER** - with the following features:
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
