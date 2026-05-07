#!/bin/bash

if [ "$1" = "dev" ]; then
    cp .env.development .env
    echo "✅ Switched to LOCALHOST environment (localhost:5173)"
elif [ "$1" = "prod" ]; then
    cp .env.production .env  
    echo "✅ Switched to PRODUCTION environment (hypervision.in)"
else
    echo "Usage: ./switch-env.sh [localhost|domain|prod]"
    echo "  dev - Switch to dev "
    echo "  prod      - Switch to production environment"
fi