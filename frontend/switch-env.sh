#!/bin/bash

if [ "$1" = "localhost" ]; then
    cp .env.development .env
    echo "✅ Switched to LOCALHOST environment (localhost:5173)"
elif [ "$1" = "domain" ]; then
    cp .env.staging .env  
    echo "✅ Switched to DOMAIN environment (hypervision.in)"
elif [ "$1" = "prod" ]; then
    cp .env.production .env  
    echo "✅ Switched to PRODUCTION environment (hypervision.in)"
else
    echo "Usage: ./switch-env.sh [localhost|domain|prod]"
    echo "  localhost - Switch to localhost redirect"
    echo "  domain    - Switch to hypervision.in redirect for testing"
    echo "  prod      - Switch to production environment"
fi