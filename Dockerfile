FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# CryptoPro and certs
RUN apt-get update && apt-get install -y libgtk2.0-0 unzip

WORKDIR tmp

# Install CryptoPro CSP
COPY crypto /tmp/

RUN tar -zxf linux-amd64_deb.tgz && cd linux-amd64_deb && \
    ./install.sh &&  \
    dpkg -i cprocsp-rdr-gui-gtk-*amd64.deb

# Symlinks
RUN ln -s /opt/cprocsp/bin/amd64/certmgr /usr/bin/certmgr && \
    ln -s /opt/cprocsp/bin/amd64/csptest /usr/bin/csptest && \
    ln -s /opt/cprocsp/sbin/amd64/cpconfig /usr/bin/cpconfig


# Install CryptoPro plug in
RUN mkdir -p /tmp/dist/cryptopro-plugin && cd /tmp/dist/cryptopro-plugin && \
    wget https://cryptopro.ru/sites/default/files/products/cades/current_release_2_0/cades-linux-amd64.tar.gz && \
    tar -xvf cades-linux-amd64.tar.gz && cd cades-linux-amd64 && \
    dpkg -i cprocsp-pki-cades-*amd64.deb &&  \
    dpkg -i cprocsp-pki-plugin-*amd64.deb


# Add trusted sites
RUN cpconfig -ini "\config\cades\trustedsites" -add multistring "TrustedSites"  \
    "https://fedresurs.ru" "http://www.cryptopro.ru" "https://www.cryptopro.ru" "http://fedresurs.ru/*"

# Certificates
RUN mkdir -p /tmp/cert && cd /tmp/cert && \
    wget http://fr-app-dev-02.devel.ifx/share/certs/autotest.zip && unzip autotest.zip || true && rm autotest.zip

# Keys to HDIMAGE
RUN mkdir -p /var/opt/cprocsp/keys/root && cp -r /tmp/cert/* /var/opt/cprocsp/keys/root/
RUN certmgr -inst -store uMy -cont '\\.\HDIMAGE\autotest'

## Remove password if exists
##RUN csptest -passwd -change '' -cont '\\.\HDIMAGE\autotest' -passwd '123456'


# Test dependencies
WORKDIR /work

COPY package*.json .
RUN npm ci
RUN npx playwright install chrome

COPY playwright.config.js .
