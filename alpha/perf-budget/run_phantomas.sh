#!/bin/sh
# Capture performance metrics for External and Internal web applications

phantomas --config=external.yaml

phantomas --config=internal.yaml

