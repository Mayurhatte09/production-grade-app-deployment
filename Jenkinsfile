pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "mayrhatte09"
        BACKEND_IMAGE = "production-grade-app-deployment-backend"
        FRONTEND_IMAGE = "production-grade-app-deployment-frontend"
        TAG = "v1"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG% Backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG% Frontend'
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG%'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f kubernetes'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl get pods -n production-grade-app'
            }
        }

    }
}