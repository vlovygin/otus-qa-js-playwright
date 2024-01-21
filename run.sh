#!/usr/bin/env bash
set -ex

xvfb-run npx playwright test
