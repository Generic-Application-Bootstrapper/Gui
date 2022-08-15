node {

    stage('build') {
        sh 'rm -rf ./*'
        sh 'git clone https://github.com/Generic-Application-Bootstrapper/Gui.git .'
        sh 'npm run  install'
        sh 'npm run  build'
    }

    stage('test') {
        sh 'npm run  install'
        sh 'npm run test'
    }

    stage('deploy') {
        sh 'npm run  install'
        sh 'npm run start'
    }
}