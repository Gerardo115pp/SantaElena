#!/usr/bin/env bash
echo "You passed the following arguments: $@"

set -Eeuo pipefail

OPERATION_DATA_DIRECTORY="/app/operation_data"
SCHEMA_DIRECTORY="${OPERATION_DATA_DIRECTORY}/schemas"
CONTENT_DIRECTORY="${OPERATION_DATA_DIRECTORY}/content"
DATABASE_DIRECTORY="${OPERATION_DATA_DIRECTORY}/databases"
SCHEMA_FILE="${SCHEMA_DIRECTORY}/sqlite_schema.sql"
DEFAULT_SCHEMA_FILE="/tmp/sqlite_schema.sql"
SETTINGS_FILE="/app/operation_data/settings.json"


# Copy the default schema if one does not exist
if [ ! -f "${SCHEMA_FILE}" ]; then
    if [ ! -d "${SCHEMA_DIRECTORY}" ]; then
        mkdir -p "${SCHEMA_DIRECTORY}"
    fi
    cp "${DEFAULT_SCHEMA_FILE}" "${SCHEMA_FILE}"
fi

# Create the settings file if it does not exist
if [ ! -f "${SETTINGS_FILE}" ]; then
    {\
        echo '{';\
        echo '    "database_engine": "sqlite",';\
        echo '    "database_schema_file": "sqlite_schema.sql",';\
        echo '    "database_content_file": "initial_content.json",';\
        echo '    "initial_locale": "en"';\
        echo '}';\
    } | tee "${SETTINGS_FILE}"
    echo "Created settings file at ${SETTINGS_FILE}"
fi

if [ ! -d "${CONTENT_DIRECTORY}" ]; then
    mkdir -p "${CONTENT_DIRECTORY}"
    for content_file in \
        /tmp/content/* \
    ; do
        if [ -f "${content_file}" ] && [ ! -f "$CONTENT_DIRECTORY/${content_file#/tmp/content/}" ]; then
            echo "File ${content_file} does not exist in ${CONTENT_DIRECTORY}, but found in /tmp/content. Copying..."
            cp "${content_file}" "${CONTENT_DIRECTORY}"
        fi
    done
    chmod -R 1777 "${CONTENT_DIRECTORY}"
fi

if [ ! -d "${DATABASE_DIRECTORY}" ]; then
    mkdir -p "${DATABASE_DIRECTORY}"
fi

exec "$@"
