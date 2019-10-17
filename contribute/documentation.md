# Contributing to documentation

This documents guides you through the process of contributing to the Grafana documentation. Make sure you've read the guide for [Contributing to Grafana](/CONTRIBUTING.md).

## Your first contribution

If you’re unsure about where to start, check out some of our [open docs issues](https://github.com/grafana/grafana/issues?q=is%3Aopen+is%3Aissue+label%3Atype%2Fdocs).

Sometimes it can be difficult to understand an issue when you're just getting started. We strive to keep a collection of [beginner-friendly issues](https://github.com/grafana/grafana/issues?q=is%3Aopen+is%3Aissue+label%3Atype%2Fdocs+label%3A"beginner+friendly") that is more suitable for first-time contributors.

When you’ve found an issue you want to work on, you’re encouraged to comment on the issue to let other people know you intend to work on it.

If you encounter any misspellings, or violations to the style guide, please let us know by submitting an issue.

On every page in the [documentation](https://grafana.com/docs/) there are two links:

- **Edit this page** takes you directly to the file on GitHub where you can contribute a fix.
- **Request doc changes** prepares an issue on GitHub with relevant information already filled in.

## Community

For general discussions on documentation, you’re welcome to join the `#docs` channel on our [public Grafana Slack](http://slack.raintank.io) team.

## Guidelines

All Grafana documentation is written using [Markdown](https://en.wikipedia.org/wiki/Markdown), and can be found in the [docs](https://github.com/grafana/grafana/tree/master/docs) directory in the [Grafana GitHub repository](https://github.com/grafana/grafana). The [documentation website](https://grafana.com/docs) is generated with [Hugo](https://gohugo.io) which uses [Blackfriday](https://github.com/russross/blackfriday) as its Markdown rendering engine.

### Structure

The documentation is organized into topics, called _sections_.

Each top-level section is located under the [docs/sources](https://github.com/grafana/grafana/tree/master/docs/sources) directory. Subsections are added by creating a subdirectory in the directory of the parent section.

For each section, a `_index.md` file is used to provide an overview of the topic.

### Style guide

A [style guide](https://github.com/grafana/grafana/blob/master/style_guides/documentation-style-guide.md), which applies to all documentation created by the Grafana project, is located in the [Grafana GitHub repository](https://github.com/grafana/grafana).

### Spelling

The [codespell](https://github.com/codespell-project/codespell) tool is run for every change to catch common misspellings.
