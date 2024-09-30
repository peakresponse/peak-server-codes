FROM node:20.17.0-bookworm

# Set an env variable for the location of the app files
ENV APP_HOME=/opt/node/app

# Configure postgres apt repository
RUN apt-get update -y && \
    apt install -y postgresql-common && \
    /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y

# Install package dependencies
RUN apt-get install -y postgresql-client-16

# update path to include any installed node module executables
RUN echo "export PATH=./node_modules/.bin:\$PATH\n" >> /root/.bashrc

# Create a directory for the server app to run from
RUN mkdir -p $APP_HOME

# Add the project files into the app directory and set as working directory
ADD . $APP_HOME
WORKDIR $APP_HOME

# Install dependencies for the main app
RUN npm install
