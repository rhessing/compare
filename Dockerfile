FROM gmolaire/yarn:1.22.4_12.18.3-alpine3.12
MAINTAINER rhessing

ARG DOWNLOAD_URL="https://github.com/rhessing/compare/archive/refs/heads/master.zip"

WORKDIR /usr/local/app

RUN apk --update add wget unzip && \
	cd /usr/local/app && \
	unzip compare-master.zip && \
	cd compare-master && \
	yarn build

EXPOSE 80

CMD [ "yarn", "serve" ]
