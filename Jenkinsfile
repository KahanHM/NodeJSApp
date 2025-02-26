pipeline {
    agent any
    environment {
        IMAGE_NAME = 'kahanhm/mongonodeapi'
    }
    stages {
        // Clone or Pull Repo
        stage('Clone or Pull Repo') {
            steps {
                script {
                    if (fileExists('NodeJSApp')) {
                        echo 'Repository already exists, pulling latest changes...'
                        sh 'cd NodeJSApp && git pull origin main'
                    } else {
                        echo 'Cloning the repository...'
                        sh 'git clone https://github.com/KahanHM/NodeJSApp.git'
                    }
                }
            }
        }


        // Create .env file
        stage('Create .env File') {
            steps {
                script {
                    if (fileExists('NodeJSApp/.env')) {
                        echo '.env available'
                        
                    } else {
                        echo 'Creating .env file...'
                    sh '''
                    echo "MONGO_URI=mongodb://localhost:27017/mydb" > NodeJSApp/.env
                    echo "PORT=5000" >> NodeJSApp/.env
                    '''
                }
                    
                }
            }
        }
        stage('Check and Install Docker') {
            steps {
                script {
                    def dockerInstalled = sh(script: 'docker --version', returnStatus: true)
                    if (dockerInstalled != 0) {
                        echo 'Docker is not installed, installing Docker...'
                        sh '''
                        sudo apt-get update
                        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
                        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
                        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
                        sudo apt-get update
                        sudo apt-get install -y docker-ce
                        sudo usermod -aG docker $USER
                        '''
                    } else {
                        echo 'Docker is already installed.'
                    }
                }
            }
        }
        // Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker Image...'
                    sh '''
                    cd NodeJSApp
                     docker build -t $IMAGE_NAME .
                    '''
                }
            }
        }
        //  Push to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_TOKEN', usernameVariable: 'DOCKER_USERNAME')]) {
                    script {
                        sh """
                        echo $DOCKER_TOKEN | sudo docker login -u $DOCKER_USERNAME --password-stdin
                        sudo docker push $IMAGE_NAME
                        """
                    }
                }
            }
        }




    }
}
