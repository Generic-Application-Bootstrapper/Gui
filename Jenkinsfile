node {

    stage('build') {
        sh 'npm run  build'
    }

    stage('test') {
        sh 'npm run test'
    }

    stage('deploy') {
        sh 'npm run start'
    }
}