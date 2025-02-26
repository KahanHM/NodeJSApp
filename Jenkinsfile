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
        // Install Docker on EC2 (only if necessary)
        stage('Install Docker on EC2') {
    steps {
        withCredentials([
            sshUserPrivateKey(credentialsId: 'Server', keyFileVariable: 'SSH_KEY', usernameVariable: 'USER'),
            string(credentialsId: 'ServerIP', variable: 'ServerIP')
        ]) {
            script {
                // Check if Docker is installed using 'which docker'
                def dockerInstalled = sh(script: """
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${USER}@${ServerIP} 'which docker > /dev/null 2>&1'
                """, returnStatus: true)

                if (dockerInstalled != 0) { // If Docker is NOT installed
                    echo 'Docker is not installed, installing Docker on EC2...'
                    sh '''
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${USER}@${Host} << 'EOF'
                        sudo apt-get update
                        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
                        curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" | sudo apt-key add -
                        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
                        sudo apt-get update
                        sudo apt-get install -y docker-ce
                        sudo usermod -aG docker $USER
                    EOF
                    '''
                    echo 'Docker installation complete. The user may need to log out and log back in for group changes to take effect.'
                } else {
                    echo 'Docker is already installed on EC2.'
                }
            }
        }
    }
}

        

        // Install Docker Compose on EC2 
stage('Install Docker Compose on EC2') {
    steps {
        withCredentials([
            sshUserPrivateKey(credentialsId: 'Server', keyFileVariable: 'SSH_KEY', usernameVariable: 'USER'),
            string(credentialsId: 'ServerIP', variable: 'ServerIP')
        ]) {
            script {
                def dockerComposeInstalled = sh(script: """
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${USER}@${ServerIP} 'docker-compose --version' || echo "Docker Compose not installed"
                """, returnStatus: true)

                if (dockerComposeInstalled != 0) {
                    echo 'Docker Compose is not installed, installing Docker Compose on EC2...'
                    sh '''
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${USER}@${Host} << 'EOF'
                    sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                    sudo chmod +x /usr/local/bin/docker-compose
                    EOF
                    '''
                } else {
                    echo 'Docker Compose is already installed on EC2.'
                }
            }
        }
    }
}





    }
}
