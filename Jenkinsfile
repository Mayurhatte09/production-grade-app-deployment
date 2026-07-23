pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "mayrhatte09"

        BACKEND_IMAGE = "production-grade-app-deployment-backend"
        FRONTEND_IMAGE = "production-grade-app-deployment-frontend"

        TAG = "v10"

        NAMESPACE = "production-grade-app"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                bat '''
                docker build -t %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG% Backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat '''
                docker build -t %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG% Frontend
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                bat '''
                docker push %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG%
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat '''
                docker push %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG%
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                kubectl apply -f kubernetes
                kubectl rollout restart deployment/backend -n %NAMESPACE%
                kubectl rollout restart deployment/frontend -n %NAMESPACE%
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat '''
                kubectl get pods -n %NAMESPACE%
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {
            bat 'docker logout'
        }
    }
}