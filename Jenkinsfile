pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {
        stage('Build') {
            steps {
                sh '${DOCKER_COMPOSE} build'
            }
        }

        stage('Test') {
            steps {
                sh '${DOCKER_COMPOSE} run --rm backend npm test'
                sh '${DOCKER_COMPOSE} run --rm frontend npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh '${DOCKER_COMPOSE} up -d'
            }
        }
    }

    post {
        always {
            sh '${DOCKER_COMPOSE} down'
        }
    }
} 