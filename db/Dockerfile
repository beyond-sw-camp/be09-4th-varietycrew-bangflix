# MariaDB Dockerfile (mariadb/Dockerfile)
FROM mariadb:

# Set environment variables for MariaDB
ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=
ENV MYSQL_USER=
ENV MYSQL_PASSWORD=

# Copy the custom initialization script to create the database and user
COPY init.sql /docker-entrypoint-initdb.d/

# Expose port 3306 to connect MariaDB
EXPOSE 3306
