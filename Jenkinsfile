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




    }
}
