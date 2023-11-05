FROM denoland/deno:1.38.0

EXPOSE 80
EXPOSE 443

WORKDIR /app

USER deno

COPY ./src/* .
RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-net", "main.ts"]
