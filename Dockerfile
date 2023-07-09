FROM denoland/deno:1.35.0

EXPOSE 80
EXPOSE 443

WORKDIR /app

USER deno

ADD ./main.ts .
RUN deno cache main.ts

CMD ["run", "--allow-env", "--allow-net", "main.ts"]
