ssh -o StrictHostKeyChecking=no $SERVER_USER@$DO_IP_ADDRESS << 'ENDSSH'
    cd /home/deploy/app
    ls
    export $(cat .env | xargs)
    docker login -u $CI_REGISTRY_USER -p $CI_JOB_TOKEN $CI_REGISTRY
    docker pull $CLIENT_IMAGE
    docker-compose -f docker-compose.prod.yml up -d --build
ENDSSH
