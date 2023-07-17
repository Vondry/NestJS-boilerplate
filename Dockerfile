# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set default environment variables
ENV POSTGRES_DB=mydefaultdb
ENV POSTGRES_USER=mydefaultuser
ENV POSTGRES_PASSWORD=mydefaultpassword

# Optionally, you can expose the PostgreSQL port (5432) and specify a volume to persist data
EXPOSE 5432
VOLUME /var/lib/postgresql/data
