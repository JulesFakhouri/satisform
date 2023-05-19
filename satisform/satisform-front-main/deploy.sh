sudo docker stop satisform-front &&
sudo docker rm satisform-front &&
sudo docker image build -t satisform-front . &&
sudo docker container run --name satisform-front -d -p 4173:4173