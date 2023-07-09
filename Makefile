normal := \e[0m
bold := \e[1m
grey := \e[2m

docker_image_name := dolibarr_live_proxy

all: list

list:
	@printf "$(bold)build_docker_image$(grey) - Build docker image\n$(normal)"

build_docker_image:
	docker build -t $(docker_image_name) .