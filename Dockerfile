FROM gmolaire/yarn:1.22.4_12.18.3-alpine3.12
MAINTAINER rhessing

ARG DOWNLOAD_URL="https://github.com/rhessing/compare/archive/refs/heads/master.zip"

WORKDIR /usr/local/app

RUN apk --update add wget unzip && \
	wget --no-check-certificate ${DOWNLOAD_URL} && \
	unzip master.zip && \
	mv compare-master/* /usr/local/app/ && \
	cd /usr/local/app && \
	yarn install && \
	yarn build

CMD [ "yarn", "serve" ]
