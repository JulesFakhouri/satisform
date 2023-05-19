sudo docker stop satisform-back &&
sudo docker rm satisform-back &&
sudo docker image build -t satisform-back . &&
sudo docker container run --name satisform-back -d -p 8080:8080 -v ./data:/app/data satisform-back