// node {

//     stage('build') {
//         cleanWs()
//         sh 'rm -rf ./{*,.[a-zA-Z]*}'
//         sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
//         sh 'npm install'
//         sh 'npm run build'
//     }

//     stage('test') {
//         sh 'npm install'
//         sh 'npm run test'
//     }

//     stage('deploy') {
//         sh 'npm  install'
//         sh 'npm run start'
//     }
// }

pipeline{
    agent any

    tools {nodejs "node"}

    stages {
        stage('Cloning Git') {
            steps{
                git "https://github.com/Generic-Application-Bootstrapper/Gui.git"
            }
        }

        stage('Installing dependencies') {
            steps{
                sh 'npm install'
            }
        }

        stage('Building') {
            steps{
                sh 'npm run buil'
            }
        }

        stage('Test') {
          steps {
            sh 'node test'
          }
        }
    }

}