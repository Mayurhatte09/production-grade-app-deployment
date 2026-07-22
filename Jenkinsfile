pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "mayrhatte09"

        BACKEND_IMAGE = "production-grade-app-deployment-backend"
        FRONTEND_IMAGE = "production-grade-app-deployment-frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"

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
                docker build -t %DOCKER_USERNAME%/%BACKEND_IMAGE%:%IMAGE_TAG% Backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat '''
                docker build -t %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%IMAGE_TAG% Frontend
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                bat '''
                docker push %DOCKER_USERNAME%/%BACKEND_IMAGE%:%IMAGE_TAG%
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat '''
                docker push %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%IMAGE_TAG%
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                kubectl apply -f kubernetes
                '''
            }
        }

        stage('Update Backend Image') {
            steps {
                bat '''
                kubectl set image deployment/backend backend=%DOCKER_USERNAME%/%BACKEND_IMAGE%:%IMAGE_TAG% -n %NAMESPACE%
                '''
            }
        }

        stage('Update Frontend Image') {
            steps {
                bat '''
                kubectl set image deployment/frontend frontend=%DOCKER_USERNAME%/%FRONTEND_IMAGE%:%IMAGE_TAG% -n %NAMESPACE%
                '''
            }
        }

        stage('Verify Rollout') {
            steps {
                bat '''
                kubectl rollout status deployment/backend -n %NAMESPACE%
                kubectl rollout status deployment/frontend -n %NAMESPACE%
                '''
            }
        }

        stage('Verify Pods') {
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