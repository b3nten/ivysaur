#!/bin/bash

# Default directory to watch (current directory)
WATCH_DIR="."

# Default command to run
COMMAND="echo 'File changed!'"

# Process group ID of the currently running command
COMMAND_PGID=""

# Function to show usage
usage() {
    echo "Usage: $0 [-d directory] [-c command]"
    echo "  -d: Directory to watch (default: current directory)"
    echo "  -c: Command to run when files change"
    exit 1
}

# Parse command line arguments
while getopts "d:c:h" opt; do
    case $opt in
        d) WATCH_DIR="$OPTARG";;
        c) COMMAND="$OPTARG";;
        h) usage;;
        \?) usage;;
    esac
done

# Function to clean up background processes
cleanup() {
    echo -e "\nCleaning up..."
    if [ ! -z "$COMMAND_PGID" ]; then
        # Kill entire process group
        kill -- -"$COMMAND_PGID" 2>/dev/null
        wait $COMMAND_PID 2>/dev/null
    fi
    kill -TERM $ 2>/dev/null
    exit 0
}

# Set up traps for all possible termination signals
trap cleanup SIGINT SIGTERM SIGQUIT SIGHUP EXIT

# Previous state hash
PREVIOUS_HASH=""

while true; do
    # Calculate current state hash
    # Use md5 on macOS and md5sum on Linux
    if command -v md5sum >/dev/null 2>&1; then
        CURRENT_HASH=$(find "$WATCH_DIR" -type f -exec md5sum {} \; | sort | md5sum)
    else
        CURRENT_HASH=$(find "$WATCH_DIR" -type f -exec md5 {} \; | sort | md5)
    fi

    # Check if state has changed
    if [ "$CURRENT_HASH" != "$PREVIOUS_HASH" ]; then
        # If there's a running command, terminate its process group
        if [ ! -z "$COMMAND_PGID" ]; then
            kill -- -"$COMMAND_PGID" 2>/dev/null
            wait 2>/dev/null
        fi

        # Run the command in background and get its PGID
        echo "Change detected!"
        # Start a new process group
        set -m
        # Run in background
        eval "$COMMAND" &
        COMMAND_PID=$!
        # Get process group ID (same as PID of group leader)
        COMMAND_PGID=$COMMAND_PID

        PREVIOUS_HASH="$CURRENT_HASH"
    fi

    # Sleep to prevent excessive CPU usage
    sleep 1
done
