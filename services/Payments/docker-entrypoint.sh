#!/usr/bin/env bash

set -Eeuo pipefail

function no_settings_log() {
    echo 'no settings found, you need to add a settings.json on the operation_data folder. here is an example of the content:'
    echo '{'
    echo '    "stripe_sk": "<YOUR SUPER SECRET STRIPE KEY>",'
    echo '    "use_wordpress_products": true, // DETERMINS IF WE USE WORDPRESS PRODUCTS OR NOT'
    echo '    "wordpress_products_suffix": "/santa-elena/v1/products", // SUFFIX FOR THE WORDPRESS PRODUCTS API'
    echo '    "stripe_currency": "mxn", // CURRENCY FOR STRIPE '
    echo '    "email_config": {'
    echo '        "mail_username": "<YOUR EMAIL>",'
    echo '        "mail_password": "<YOUR EMAIL APP PASSWORD>",'
    echo '        "mail_server": "smtp.gmail.com", // EMAIL SERVER, FOR GMAIL USE smtp.gmail.com'
    echo '        "mail_port": "587", // EMAIL PORT, FOR GMAIL USE 587'
    echo '        "mail_from": "Santa Elena" // EMAIL FROM, THIS WILL BE THE NAME OF THE SENDER'
    echo '    }'
    echo '}'
}

OPERATION_DATA_DIRECTORY="/app/operation_data"
EMAIL_TEMPLATE_DIRECTORY="${OPERATION_DATA_DIRECTORY}/email"
SCHEMA_DIRECTORY="${OPERATION_DATA_DIRECTORY}/schemas"
SETTINGS_FILE="${OPERATION_DATA_DIRECTORY}/settings.json"

# Make sure the operation_data directory and a settings file within it exists
if [ ! -d "${OPERATION_DATA_DIRECTORY}" ]; then
    no_settings_log
    echo "Can't proceed without the operation_data directory. Please create it and add a settings.json file within it."
    exit 1
fi

if [ ! -f "${SETTINGS_FILE}" ]; then
    no_settings_log
    echo "Can't proceed without the settings.json file. Please create it within the operation_data directory."
    exit 1
fi

# Create the email template directory and move 
if [ ! -d "${EMAIL_TEMPLATE_DIRECTORY}" ]; then
    mkdir -p "${EMAIL_TEMPLATE_DIRECTORY}"
    for email_file in \
        /tmp/email/* \
    ; do
        if [ -f "${email_file}" ] && [ ! -f "$EMAIL_TEMPLATE_DIRECTORY/${email_file#/tmp/email/}" ]; then
            echo "File ${email_file} does not exist in ${EMAIL_TEMPLATE_DIRECTORY}, but found in /tmp/email. Copying..."
            cp "${email_file}" "${EMAIL_TEMPLATE_DIRECTORY}"
        fi
    done
    chmod -R 1777 "${EMAIL_TEMPLATE_DIRECTORY}"
fi

# Create the schema directory and move the default schema if one does not exist
if [ ! -d "${SCHEMA_DIRECTORY}" ]; then
    mkdir -p "${SCHEMA_DIRECTORY}"
    for schema_file in \
        /tmp/schemas/* \
    ; do
        if [ -f "${schema_file}" ] && [ ! -f "$SCHEMA_DIRECTORY/${schema_file#/tmp/schemas/}" ]; then
            echo "File ${schema_file} does not exist in ${SCHEMA_DIRECTORY}, but found in /tmp/schemas. Copying..."
            cp "${schema_file}" "${SCHEMA_DIRECTORY}"
        fi
    done
    chmod -R 1777 "${SCHEMA_DIRECTORY}"
fi

exec "$@"