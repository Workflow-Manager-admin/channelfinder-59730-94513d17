#!/bin/bash
cd /home/kavia/workspace/code-generation/channelfinder-59730-94513d17/channelfinder_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

